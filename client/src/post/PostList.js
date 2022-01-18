import Post from './Post';
import styled from 'styled-components';

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

export default function PostList({ postListRef, posts }) {
  return (
    <StyledPostList ref={postListRef}>
      {posts.map(({ _id: id, ...post }) => (
        <Post key={id} post={{ id, ...post }} />
      ))}
    </StyledPostList>
  );
}
