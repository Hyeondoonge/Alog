import { safelyCheckLanguages, safelyCheckLoginUrl, safelyCheckPosts } from 'api/helper';
import { Language, Option } from 'types/api';
import { IPost } from 'types/post';

// createQuery를 만들기 위해 값이 비거나 없는 속성은 제거하고
// url query를 생성
const createQuery: (option: Option) => string = (option) => {
  return Object.keys(option)
    .filter((key) => {
      const typedKey = key as keyof Option;
      const value = option[typedKey];

      if (!value) return false; // undefined, null, 0, '' 우선 제거

      if (value instanceof Array) {
        return value.length !== 0;
      }

      return true;
    })
    .map((key) => {
      const typedKey = key as keyof Option;
      let value = option[typedKey];
      if (key === 'languages') value = encodeURIComponent(JSON.stringify(value)); // 인코딩 대상 query: langauge
      return `${key}=${value}`;
    })
    .join('&');
};

// response type이 정상적일 때의 반환값으로 충분?
const fetchLanguages_GET: () => Promise<{ languages: Language[] } | undefined> = async () => {
  try {
    const response = await fetch('/api/languages');
    // TODO: 안전한 에러 핸들링 추가
    const json = await response.json();
    safelyCheckLanguages(json);
    return json;
  } catch (err) {
    console.log(err);
    return;
  }
};

const fetchPost_GET = async (id) => {
  try {
    const response = await fetch(`/api/post?id=${id}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

const fetchPosts_GET: (oprion: Option) => Promise<
  | {
      posts: IPost[];
      totalCount: number;
      leftCount: number;
    }
  | undefined
> = async (option) => {
  try {
    const query = createQuery(option);

    const response = await fetch(`/api/posts/search?${query}`);
    const json = await response.json();
    safelyCheckPosts(json);
    return json;
  } catch (err) {
    console.log(err);
    return;
  }
};

const fetchLike_POST = (id) => async (accessToken) => {
  try {
    const response = await fetch(`/api/like`, {
      method: 'post',
      body: JSON.stringify({ postId: id }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

const fetchLike_DELETE = (id) => async (accessToken) => {
  try {
    const response = await fetch(`/api/like`, {
      method: 'delete',
      body: JSON.stringify({ postId: id }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { fetchLanguages_GET, fetchPosts_GET, fetchPost_GET, fetchLike_POST, fetchLike_DELETE };
