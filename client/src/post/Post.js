import { useContext } from 'react';
import styled from 'styled-components';
import Tag from '../common/Tag';
import Card from '../common/Card';
import ThemeContext from '../contexts/ThemeContext';

const ResponsiveImage = ({ src }) => (
  <div style={{ width: '2.3rem', height: '3.2rem' }}>
    <img src={src} width="100%" height="100%" />
  </div>
);

const StyledPost = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
`;

// StyledPost를 젤 바깥으로 빼기
export default function Post({ post }) {
  const { id, title, subtitle, platform, language, writerId, writeDate } = post;

  const theme = useContext(ThemeContext);

  return (
    <Card color={theme.content}>
      <StyledPost>
        <div style={{ width: '80%' }}>
          <div
            style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}
          >
            <ResponsiveImage src={`/images/${platform}-symbol.png`} />
            <strong>{title}</strong>
            <Tag label={language} size="1.5" />
          </div>
          <div>
            <span>{subtitle}</span>
          </div>
          <div>
            {writerId} ・ {writeDate}
          </div>
        </div>
        <div style={{ width: '10%' }}>
          {/* <div>👍🏻 8</div>
          <div>💬 3</div> */}
        </div>
      </StyledPost>
    </Card>
  );
}
