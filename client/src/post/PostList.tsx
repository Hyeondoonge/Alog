import { IPost } from 'types/post';
import Post from './Post';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Skeleton from 'common/Skeleton';

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

interface PostListProps {
  isLoading: boolean;
  posts: IPost[];
  handleIntersect: () => void;
}

export default function PostList({ isLoading, posts, handleIntersect }: PostListProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { createObserver, registerTargets } = useIntersectionObserver();

  useEffect(() => {
    if (posts.length === 0) return;
    if (ref.current === null) {
      return;
    }
    const lastPost = ref.current.lastElementChild;
    if (!(lastPost instanceof HTMLElement)) {
      return;
    }
    createObserver(handleIntersect);
    registerTargets([lastPost]);
  }, [posts]);

  return (
    <>
      <StyledPostList ref={ref}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </StyledPostList>
      {isLoading && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 50 }}>
          {new Array(3).fill(null).map((_, index) => (
            <div
              key={index}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '75%' }}>
                <Skeleton
                  Component={<div style={{ width: '40%', height: '5rem', borderRadius: '2rem' }} />}
                />
                <Skeleton
                  Component={<div style={{ width: '60%', height: '5rem', borderRadius: '2rem' }} />}
                />
              </div>
              <div style={{ width: '15%' }}>
                <Skeleton Component={<div style={{ height: '10rem', borderRadius: '2rem' }} />} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
