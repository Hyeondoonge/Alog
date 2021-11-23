// createQuery를 만들기 위해 값이 비거나 없는 속성은 제거하고
// url query를 생성
const createQuery = (option) => {
  return Object.keys(option)
    .filter((key) => option[key].length !== 0 && option[key])
    .map((key) => {
      let value = option[key];
      if (key === 'languages') value = encodeURIComponent(option[key]); // 인코딩 대상 query: langauge
      return `${key}=${value}`;
    })
    .join('&');
};

const fetchLanguages_GET = async () => {
  try {
    const response = await fetch('/api/languages');

    const result = await response.json();
    return result;
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

const fetchPosts_GET = async (option) => {
  try {
    const query = createQuery(option);
    const response = await fetch(`/api/posts/search?${query}`);
    const result = await response.json();
    return result;
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
