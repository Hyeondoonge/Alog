import { useContext } from 'react';
import styled from 'styled-components';
import Tag from '../common/Tag';
import Card from '../common/Card';
import ThemeContext from '../contexts/ThemeContext';
import { RiThumbUpFill } from 'react-icons/ri';

const ResponsiveImage = ({ src }) => (
  <div style={{ width: '2rem', justifyContent: 'center', display: 'flex' }}>
    <img src={src} width={16} />
  </div>
);

const StyledPost = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  gap: 10px;
`;

// StyledPost를 젤 바깥으로 빼기
export default function Post({ post }) {
  const { id, title, subtitle, platform, language, writerId, writeDate, likeCount } = post;

  const theme = useContext(ThemeContext);

  return (
    <Card color={theme.content}>
      <StyledPost>
        <div style={{ width: '85%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <ResponsiveImage src={`/images/${platform}-symbol.png`} />
            <div>
              <strong>{title}</strong>
            </div>
            {language && <Tag label={language} size="1.6" />}
          </div>
          <div>
            <span>{subtitle}</span>
          </div>
          <div>
            {writerId} ・ {writeDate}
          </div>
        </div>
        <div
          style={{
            fontSize: '1.8rem',
            wordBreak: 'keep-all',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div>
            <span style={{ color: 'grey' }}>좋은 솔루션이에요</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RiThumbUpFill color={theme.main} size="2rem" />
            <strong>{likeCount}</strong>
          </div>
        </div>
      </StyledPost>
    </Card>
  );
}
