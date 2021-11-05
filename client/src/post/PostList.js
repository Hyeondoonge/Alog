import Post from './Post';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  &:link {
    text-decoration: none;
  }
`;

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

export default function PostList({ postListRef, posts }) {
  return (
    <StyledPostList ref={postListRef}>
      {posts.map(({ _id: id, ...post }) => (
        <StyledLink to={`/post?id=${id}`}>
          <Post key={id} post={{ id, ...post }} />
        </StyledLink>
      ))}
    </StyledPostList>
  );
}
