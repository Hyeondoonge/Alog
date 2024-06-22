// fetch post를 호출 이벤트가 3개
// 비슷하고 중복되는 로직 -> useGetPost를 만들어 로직을 묶고, 여기서 서버로부터 전달받는 상태들을 관리
// => 서버에서 전달받은 데이터와, 클라이언트에서 만이 설정가능한 상태들을 따로 관리하면 쉽다.
// 서버 데이터들 (상태)를 사용자 hook으로 전달받아 컴포넌트에서 사용하면 된다.

import { useRef, useState } from 'react';
import { fetchPosts_GET } from '../post/fetchApis';
import { Option } from 'types/api';
import { IPost } from 'types/post';
import { safelyCheckPosts } from 'api/helper';

interface IData {
  posts: IPost[];
  leftCount: number;
  totalCount: number;
}

const PostStorage = {
  get: (key: string) => {
    const value = window.sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    const data = JSON.parse(value);
    // TODO: safelyCheckPosts 공통 함수로 뺄지 여부
    safelyCheckPosts(data);
    return data;
  },
  set: (key: string, value: IData) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export default function useGetPost() {
  const [data, setData] = useState<IData>(() => {
    const { search } = window.location;
    const value = PostStorage.get(search);
    if (!value) {
      return { posts: [], totalCount: 0, leftCount: 0 };
    }
    return value;
  });
  const [isLoading, setIsLoading] = useState(false);

  const accRequest = useRef<number>(0);

  const initPost = async () => {
    setData({ posts: [], totalCount: 0, leftCount: 0 });
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

      if (!option.cursor)
        setData({
          posts: res.posts,
          leftCount: res.leftCount,
          totalCount: res.totalCount
        });
      else
        setData({
          posts: [...data.posts, ...res.posts],
          leftCount: res.leftCount,
          totalCount: res.totalCount
        });
      setIsLoading(false);

      const { search } = window.location;
      PostStorage.set(search, {
        totalCount: res.totalCount,
        leftCount: res.leftCount,
        posts: !option.cursor ? res.posts : [...data.posts, ...res.posts]
      });
    } catch (error) {
      console.log(error);
    }
  };

  function initPostWithQuery() {
    if (window.location.pathname !== '/') {
      return;
    }

    const { search } = window.location;
    const data = PostStorage.get(search);

    if (!data) {
      initPost();
      return;
    }

    setData({ posts: data.posts, totalCount: data.totalCount, leftCount: data.leftCount });
  }

  return {
    data,
    isLoading,
    updatePost,
    initPost,
    initPostWithQuery
  };
}
