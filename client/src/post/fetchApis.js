const searchPost = async (keyword) => {
  try {
    const response = await fetch(`/posts/search?keyword=${keyword}`, {
      // proxy
      method: 'get'
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { searchPost };
