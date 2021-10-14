const fetchLanguagesByKeword = async (keyword, callback) => {
  try {
    const res = await fetch(`/api/languages/search?keyword=${encodeURIComponent(keyword)}`);
    callback(await res.json()); // 에러없이 처리됐을 때, 응답된 데이터를 전달해 callback 실행
  } catch (error) {
    // 에러 발생 시 그에 대응하는 처리 / 에러 페이지 렌더링 필요.
    console.log(error);
  }
};

export { fetchLanguagesByKeword };
