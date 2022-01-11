const fetchUserInfo_GET = async (target, finder) => {
  try {
    const response = await fetch(`/api/user?target=${target}&finder=${finder}`);

    const result = await response.json();

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { fetchUserInfo_GET };
