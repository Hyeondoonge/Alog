import { IPost } from 'types/Post';
import Post from './Post';
import styled from 'styled-components';

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

interface PostListProps {
  postListRef: React.RefObject<HTMLDivElement>;
  posts: IPost[];
}

export default function PostList({ postListRef, posts }: PostListProps) {
  return (
    <StyledPostList ref={postListRef}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </StyledPostList>
  );
}
