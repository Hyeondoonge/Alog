const searchPost = async (keyword, size, cursor) => {
  try {
    const response = await fetch(
      `/posts/search?keyword=${keyword}&cursor=${cursor ?? 'none'}&size=${size}`,
      {
        // proxy
        method: 'get'
      }
    );

    if (response.status === 204) return;
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { searchPost };
