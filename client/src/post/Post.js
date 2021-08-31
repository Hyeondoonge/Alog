import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import Tag from '../common/Tag';
import ThemeContext from '../contexts/ThemeContext';

const scale = keyframes`
 50% {
  transform: translateY(-5%);
 }
 100% {
  transform: translateY(0%);
 }
`;

const StyledCard = styled.div`
  background-color: ${(props) => props?.color ?? 'white'};
  color: black;
  border-radius: 10px;
  padding: 50px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    animation: 1s ${scale};
  }
`;

function Card({ color, children }) {
  return <StyledCard color={color}>{children}</StyledCard>;
}

const StyledPost = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

export default function Post({ post }) {
  const { _id: id, title, subtitle, platform, language, writerId, writeDate } = post;
  const theme = useContext(ThemeContext);

  return (
    <Card color={theme.content}>
      <StyledPost>
        <div>
          <div
            style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}
          >
            <img src={`/images/${platform}-symbol.png`} alt={`${platform}symbol`} />
            <strong>{title}</strong>
            <Tag label={language} size={1.0} />
          </div>
          <div>
            <span>{subtitle}</span>
          </div>
          <div>
            {writerId} ・ {writeDate}에 작성된 글
          </div>
        </div>
        <div>좋아요 8</div>
        <div>댓글 3</div>
      </StyledPost>
    </Card>
  );
}
