import Post from './Post';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Skeleton from 'common/Skeleton';
import useOptionStore from 'store/option';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts_GET } from './fetchApis';
import useLanguagesStore from 'store/languages';

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

// TODO: Home, UserHome 재사용성 향상
export default function PostList() {
  const size = 50;
  const { keyword, isSelected } = useOptionStore((state) => ({
    keyword: state.keyword,
    isSelected: state.isSelected
  }));
  const { languages } = useLanguagesStore((state) => ({
    languages: state.languages
  }));
  const filteredLanguages = languages
    .filter((_, index) => isSelected[index])
    .map(({ name }) => name);

  const metadata = useRef<{ totalCount: null | number; leftCount: null | number }>({
    totalCount: 0,
    leftCount: 0
  });
  const { totalCount, leftCount } = metadata.current;

  const { data, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['posts', keyword, filteredLanguages],
    queryFn: async ({ pageParam }) => {
      if (!keyword) {
        metadata.current = { totalCount: 0, leftCount: 0 };
        return [];
      }

      const res = await fetchPosts_GET({
        keyword,
        languages: filteredLanguages,
        cursor: pageParam,
        size
      });

      if (!res) {
        // TODO: 에러 핸들링 개선
        throw new Error('failed to fetch post');
      }
      const { posts, totalCount, leftCount } = res;
      metadata.current = { totalCount, leftCount };
      return posts;
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => (lastPage.length ? lastPage[lastPage.length - 1]._id : null),
    throwOnError: false,
    gcTime: 120 * 60 * 1000
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const { createObserver, registerTargets } = useIntersectionObserver();

  const handleIntersect = () => {
    if (leftCount === 0) return;
    fetchNextPage();
  };

  useEffect(() => {
    if (data === undefined) return;
    const { pages } = data;

    const posts = pages.flat();

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
  }, [data]);

  if (error || !data) {
    // FIX: 에러, 로딩 핸들링 개선
    return <div>Error</div>;
  }

  const posts = data.pages.flat();

  return (
    <>
      {keyword && (!isFetchingNextPage || posts.length !== 0) && (
        <span style={{ fontSize: '2rem' }}>
          {totalCount ? `검색 결과 ${totalCount}개의 풀이` : '검색 결과가 없습니다.'}
        </span>
      )}
      {isFetchingNextPage && !posts.length && (
        <Skeleton
          Component={<div style={{ width: '20rem', height: '5rem', borderRadius: '2rem' }} />}
        />
      )}
      <StyledPostList ref={ref}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </StyledPostList>
      {isFetchingNextPage && (
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
