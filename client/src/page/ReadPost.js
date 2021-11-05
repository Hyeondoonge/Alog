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
`;

export default function Post() {
  const { id } = queryString.parse(useLocation().search);
  const userId = 'jsi06138';
  const [post, setPost] = useState({});
  const { title, platform, subtitle, language, content, writeDate, writerId } = post;
  const [liker, setLiker] = useState([]);
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetchPost_GET(id);
      setPost(res.post);
      setLiker(res.liker);
      setIsLoading(false);
    })();
  }, []);

  const onClickLike = () => {
    if (liker.some(({ userId }) => userId === 'jsi06138')) {
      (async () => {
        const res = await fetchLike_DELETE(id, userId);
        setLiker(res);
        setLike(0);
      })();
    } else {
      (async () => {
        const res = await fetchLike_POST(id, userId);
        setLiker(res);
        setLike(1);
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
          {like === 1 && (
            <StyledThumbsUpText>
              <RiThumbUpFill color={theme.main} /> 좋은 솔루션이에요
            </StyledThumbsUpText>
          )}
          <RiThumbUpFill
            onClick={onClickLike}
            color={liker.some(({ userId }) => userId === 'jsi06138') ? theme.main : 'white'}
            style={{ cursor: 'pointer' }}
          />{' '}
          {liker.length}
          <RiChat1Fill color={theme.main} /> 0{' '}
        </div>
      </div>
    </Template>
  );
}
