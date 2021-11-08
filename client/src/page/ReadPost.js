import { useContext, useEffect, useState } from 'react';
import Template from '../Template';
import { MarkDownPreview } from '../common/MarkDownPreview';
import { fetchLike_DELETE, fetchLike_POST, fetchPost_GET } from '../post/fetchApis';
import Tag from '../common/Tag';
import { RiThumbUpFill, RiChat1Fill } from 'react-icons/ri';
import ThemeContext from '../contexts/ThemeContext';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

export default function Post() {
  const { id } = queryString.parse(useLocation().search);
  const userId = 'jsi06138';
  const [post, setPost] = useState({});
  const { title, platform, subtitle, language, content, writeDate, writerId } = post;
  const [likeCount, setLikeCount] = useState(0);
  const [isLiker, setIsLiker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickLike, setClickLike] = useState(false);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetchPost_GET(id);
      setPost(res.post);
      setLikeCount(res.liker.length);
      setIsLiker(res.liker.some(({ userId: id }) => userId === id));
      setIsLoading(false);
    })();
  }, []);

  const onClickLike = () => {
    if (isLiker) {
      (async () => {
        setIsLiker(false);
        setLikeCount(likeCount - 1);
        setClickLike(false);
        const res = await fetchLike_DELETE(id, userId);
      })();
    } else {
      (async () => {
        setIsLiker(true);
        setLikeCount(likeCount + 1);
        setClickLike(true);
        const res = await fetchLike_POST(id, userId);
      })();
    }
  };

  const onClickProfile = () => {
    // 마이 홈으로 이동
    // <Link> 컴포넌트로 감싸준다
  };

  if (isLoading) return <div>로딩 중</div>;

  return (
    <Template>
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
