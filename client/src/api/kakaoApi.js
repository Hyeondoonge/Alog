const fetchToken_POST = async (code) => {
  try {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'post',
      headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${code}`
    });
    const response = await res.json();
    return [response.access_token, response.refresh_token];
  } catch (error) {
    console.log(error);
  }
};

const fetchUserNumber_GET = async (accessToken) => {
  const res = await fetch('/kapi/v1/user/access_token_info', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const response = await res.json();
  return response.id;
};

const fetchRefreshToken_POST = async (refreshToken) => {
  const res = await fetch('/kauth/oauth/token', {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: `grant_type=refresh_token&client_id=${process.env.REACT_APP_CLIENT_KEY}&refresh_token=${refreshToken}`
  });
  const response = await res.json();
  return response.access_token;
};

export { fetchToken_POST, fetchUserNumber_GET, fetchRefreshToken_POST };
