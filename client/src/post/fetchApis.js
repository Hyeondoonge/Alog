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

const fetchLanguages = async () => {
  try {
    const response = await fetch(`/languages`);

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

const fetchPosts = async (option) => {
  // keyword, language, cursor, size
  try {
    const query = createQuery(option);
    const response = await fetch(`/posts/search?${query}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { fetchLanguages, fetchPosts };
