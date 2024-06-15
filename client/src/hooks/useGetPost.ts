// fetch post를 호출 이벤트가 3개
// 비슷하고 중복되는 로직 -> useGetPost를 만들어 로직을 묶고, 여기서 서버로부터 전달받는 상태들을 관리
// => 서버에서 전달받은 데이터와, 클라이언트에서 만이 설정가능한 상태들을 따로 관리하면 쉽다.
// 서버 데이터들 (상태)를 사용자 hook으로 전달받아 컴포넌트에서 사용하면 된다.

import { useRef, useState } from 'react';
import { fetchPosts_GET } from '../post/fetchApis';
import { Option } from 'types/api';
import { IPost } from 'types/post';

export default function useGetPost() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [leftCount, setLeftCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const accRequest = useRef<number>(0);

  const initPost = async () => {
    setTotalCount(0);
    setLeftCount(0);
    setPosts([]);
  };

  const updatePost = async (option: Option) => {
    const curRequest = ++accRequest.current;

    try {
      // queryObject는 Home에서 전달
      if (!option.keyword && !option.writerId) {
        initPost();
        return;
      }

      setIsLoading(true);

      const res = await fetchPosts_GET(option);

      if (!res) {
        throw new Error('failed to fetch post');
      }

      if (curRequest !== accRequest.current) {
        return;
      }

      setTotalCount(res.totalCount);
      setLeftCount(res.leftCount);

      if (!option.cursor) setPosts(res.posts);
      else setPosts([...posts, ...res.posts]);
      setIsLoading(false);

      // 결과 기록하기
      const { search } = window.location;
      window.sessionStorage.setItem(
        search,
        JSON.stringify({
          totalCount: res.totalCount,
          leftCount: res.leftCount,
          posts: !option.cursor ? res.posts : [...posts, ...res.posts]
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  function initPostWithQuery() {
    if (window.location.pathname !== '/') {
      return;
    }

    const { search } = window.location;

    // FIX: assertion
    const data = JSON.parse(window.sessionStorage.getItem(search) || 'null') as {
      posts: IPost[];
      leftCount: number;
      totalCount: number;
    };

    if (!data) {
      setTotalCount(0);
      setLeftCount(0);
      setPosts([]);
      return;
    }

    setTotalCount(data.totalCount);
    setLeftCount(data.leftCount);
    setPosts(data.posts);
  }

  return {
    posts,
    totalCount,
    leftCount,
    isLoading,
    updatePost,
    initPost,
    initPostWithQuery
  };
}
