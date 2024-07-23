import { useRef } from 'react';
import Skeleton from 'common/Skeleton';
import useOptionStore from 'store/option';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts_GET } from '../post/fetchApis';
import useLanguagesStore from 'store/languages';
import PostList from 'common/PostList';

export default function SearchPostList() {
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

  const handleIntersect = () => {
    if (leftCount === 0) return;
    fetchNextPage();
  };

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
      <PostList posts={posts} handleIntersect={handleIntersect} isLoading={isFetchingNextPage} />
    </>
  );
}
