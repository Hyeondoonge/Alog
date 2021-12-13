const kakao_GetLoginUrl = async () => {
  try {
    const res = await fetch(`/api/kakaoAuth/loginUrl`);
    const response = await res.json();
    return response.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kakao_GetToken = async (code) => {
  try {
    const res = await fetch(`/api/kakaoAuth/token?code=${code}`);
    const response = await res.json();
    return [response.access_token, response.refresh_token];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kakao_GetUserInfo = async (kakao_accessToken) => {
  try {
    const res = await fetch(`/api/kakaoAuth/info?`, {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      }
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kakao_RefreshAccessToken = async (kakao_refreshToken) => {
  try {
    const res = await fetch(`/api/kakaoAuth/updateToken`, {
      headers: {
        Authorization: `Bearer ${kakao_refreshToken}`
      }
    });
    const response = await res.json();
    return response.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kakao_Logout = async (kakao_accessToken) => {
  // /v1/user/logout
  try {
    const res = await fetch(`/api/kakaoAuth/logout`, {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      }
    }); // access token 만료됐다면?
    const response = await res.json();
    return response; // 로그아웃된 사용자의 번호
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  kakao_GetLoginUrl,
  kakao_GetToken,
  kakao_GetUserInfo,
  kakao_RefreshAccessToken,
  kakao_Logout
};
