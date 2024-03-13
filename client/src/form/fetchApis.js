const fetchLanguage_GET = async (keyword, callback) => {
  try {
    const res = await fetch(`/api/languages/search?keyword=${encodeURIComponent(keyword)}`);
    callback(await res.json());
  } catch (error) {
    console.log(error);
  }
};

const fetchSolution_GET = async (id) => {
  try {
    const res = await fetch(`/api/post?id=${id}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchSolution_POST = (post) => async (accessToken) => {
  try {
    const res = await fetch('/api/post', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...post })
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const fetchSolution_PUT = (id, post) => async (accessToken) => {
  try {
    delete post._id;

    const res = await fetch(`/api/post?id=${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const fetchSolution_DELETE = (id) => async (accessToken) => {
  try {
    const response = await fetch(`/api/post?id=${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

export {
  fetchLanguage_GET,
  fetchSolution_GET,
  fetchSolution_POST,
  fetchSolution_PUT,
  fetchSolution_DELETE
};
