const fetchUserInfo_GET = async (target) => {
  try {
    const response = await fetch(`/api/user?target=${target}`);

    const result = await response.json();

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { fetchUserInfo_GET };
