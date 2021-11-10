const fetchToken_POST = async (code) => {
  try {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'post',
      headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_KEY}&redirect_uri=http://localhost:3000/signup&code=${code}`
    });
    const response = await res.json();
    return [response.access_token, response.refresh_token];
  } catch (error) {
    console.log(error);
  }
};

const fetchUserNumber_GET = async (accessToken) => {
  const res = await fetch('/kakao/v1/user/access_token_info', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });
  const response = await res.json();
  return response.id;
};

export { fetchToken_POST, fetchUserNumber_GET };
