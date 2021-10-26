const fetchLanguage_GET = async (keyword, callback) => {
  try {
    const res = await fetch(`/api/languages/search?keyword=${encodeURIComponent(keyword)}`);
    callback(await res.json()); // 에러없이 처리됐을 때, 응답된 데이터를 전달해 callback 실행
  } catch (error) {
    // 에러 발생 시 그에 대응하는 처리 / 에러 페이지 렌더링 필요.
    console.log(error);
  }
};

const fetchSolution_GET = async (id) => {
  try {
    const res = await fetch(`/api/posts?id=${id}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchSolution_POST = async (post) => {
  try {
    const res = await fetch('/api/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchSolution_PUT = async (id, post) => {
  try {
    delete post._id;

    const res = await fetch(`/api/posts?id=${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { fetchLanguage_GET, fetchSolution_GET, fetchSolution_POST, fetchSolution_PUT };
