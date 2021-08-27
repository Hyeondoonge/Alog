import styled from 'styled-components';
import Tag from '../common/Tag';

const StyledCard = styled.div`
  box-shadow: 0 0 2px 1px #eee;
  border-radius: 5px;
  padding: 5%;
  transition: 0.5s;
  cursor: pointer;
`;

function Card({ children }) {
  return <StyledCard>{children}</StyledCard>;
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
  return (
    <Card>
      <StyledPost key={id}>
        <div>
          <div
            style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}
          >
            <img src={`/images/${platform}-symbol.png`} alt={`${platform}symbol`} />
            <strong>{title}</strong>
            <Tag label={language} size={1.0} />
          </div>
          <span>너무 어려운 문제였다...</span>
          {writeDate}
        </div>
        <div>좋아요 8</div>
        <div>댓글 3</div>
      </StyledPost>
    </Card>
  );
}
