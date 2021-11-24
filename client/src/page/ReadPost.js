import { useContext, useEffect, useState } from 'react';
import Template from '../Template';
import { MarkDownPreview } from '../common/MarkDownPreview';
import { fetchLike_DELETE, fetchLike_POST, fetchPost_GET } from '../post/fetchApis';
import { fetchSolution_DELETE } from '../form/fetchApis';
import Tag from '../common/Tag';
import { RiThumbUpFill, RiChat1Fill } from 'react-icons/ri';
import ThemeContext from '../contexts/ThemeContext';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled, { keyframes } from 'styled-components';
import UserContext from '../contexts/UserContext';
import useToken from '../hooks/useToken';
import ModalContext from '../contexts/ModalContext';
import Link from '../common/Link';

const ResponsiveImage = ({ src }) => (
  <div style={{ width: '2rem', justifyContent: 'center', display: 'flex' }}>
    <img src={src} width={16} />
  </div>
);

const thumbsup_animation = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }

  60% {
    transform: translateY(0px);
    opacity: 100;
  }

  100% {
    transform: translateY(-10px);
    opacity: 0;
  }
`;

const StyledThumbsUpText = styled.span`
  position: absolute;
  opacity: 0;
  animation: ${thumbsup_animation} 1s;
  color: white;
  top: -30px;
  left: 0px;
  text-shadow: 0px 0px 3px black;
`;

const StyledMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  text-align: right;
  font-size: 20px;

  & * :hover {
    text-decoration: underline ${(props) => props.underlineColor};
  }

  & > button {
    background-color: transparent;
    cursor: pointer;
    font-size: inherit;
    color: white;
    border: none;
  }
`;

export default function Post() {
  const { id } = queryString.parse(useLocation().search);
  const [isLoggedIn, _, userData] = useContext(UserContext);
  const [setMessage] = useContext(ModalContext);
  const [post, setPost] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [isLiker, setIsLiker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickLike, setClickLike] = useState(false);
  const [__, requestService] = useToken();

  const history = useHistory();

  const theme = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetchPost_GET(id);
      setPost(res.post);
      if (!res.post) {
        setIsLoading(false);
        return;
      }
      setLikeCount(res.liker.length);
      setIsLiker(res.liker.some(({ userId: id }) => userData.userId === id));
      setIsLoading(false);
    })();
  }, [userData]);

  const onClickLike = () => {
    if (!isLoggedIn) {
      setMessage('서비스를 이용하려면 로그인 또는 회원가입 해야합니다');
      return;
    }

    if (isLiker) {
      (async () => {
        setIsLiker(false);
        setLikeCount(likeCount - 1);
        setClickLike(false);

        const res = await requestService(() => fetchLike_DELETE(id));
      })();
    } else {
      (async () => {
        setIsLiker(true);
        setLikeCount(likeCount + 1);
        setClickLike(true);

        const res = await requestService(() => fetchLike_POST(id));
      })();
    }
  };

  const onClickDelete = () => {
    alert('정말 삭제하시겠습니까?');
    (async () => {
      const res = await requestService(() => fetchSolution_DELETE(id));
      // replace?
      alert('삭제 됐습니다.');
      history.goBack();
    })();
  };

  const onClickProfile = () => {
    // 마이 홈으로 이동
    // <Link> 컴포넌트로 감싸준다
  };

  if (isLoading) return <div>로딩 중</div>;

  console.log(post);

  if (post === null) return <Template>존재하지 않는 게시물!!!</Template>;
  const { title, platform, subtitle, language, content, writeDate, writerId } = post;

  return (
    <Template header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '16px' }}>
          <ResponsiveImage src={`/images/${platform}-symbol.png`} />
          <h1>{title}</h1>
          {language && (
            <div>
              <Tag label={language} />
            </div>
          )}
        </div>
        {userData.userId === writerId && (
          <StyledMenu underlineColor={theme.main}>
            <Link to={`/edit?id=${post._id}`}>수정</Link>
            <button type="button" onClick={onClickDelete}>
              <span>삭제</span>
            </button>
          </StyledMenu>
        )}
        <div>{subtitle}</div>
        <div>
          {writerId} ・ {writeDate}
        </div>
        {/* user profile component */}
        <MarkDownPreview source={content} />
        <div style={{ fontSize: '2.5rem', position: 'relative' }}>
          {' '}
          {clickLike && (
            <StyledThumbsUpText>
              <RiThumbUpFill color={theme.main} /> 좋은 솔루션이에요
            </StyledThumbsUpText>
          )}
          <RiThumbUpFill
            onClick={onClickLike}
            color={isLiker ? theme.main : 'white'}
            style={{ cursor: 'pointer' }}
          />{' '}
          {likeCount}
          <RiChat1Fill color={theme.main} /> 0{' '}
        </div>
      </div>
    </Template>
  );
}
