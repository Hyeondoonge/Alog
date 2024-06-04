import { safelyCheckLoginUrl, safelyCheckLogoutInfo, safelyCheckRefreshToken } from './helper';

const kakao_GetLoginUrl: () => Promise<string | null> = async () => {
  try {
    const res = await fetch(`/api/kakaoAuth/loginUrl`);
    const json = await res.json();
    safelyCheckLoginUrl(json);
    return json.url;
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

const kakao_RefreshAccessToken: (kakao_refreshToken: string) => Promise<string | null> = async (
  kakao_refreshToken
) => {
  try {
    const res = await fetch(`/api/kakaoAuth/updateToken`, {
      headers: {
        Authorization: `Bearer ${kakao_refreshToken}`
      }
    });
    const json = await res.json();
    safelyCheckRefreshToken(json);
    return json.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const kakao_Logout: (kakao_accessToken: string) => Promise<{
  id: number;
} | null> = async (kakao_accessToken) => {
  // /v1/user/logout
  try {
    const res = await fetch(`/api/kakaoAuth/logout`, {
      headers: {
        Authorization: `Bearer ${kakao_accessToken}`
      }
    }); // access token 만료됐다면?
    const json = await res.json();
    safelyCheckLogoutInfo(json);
    return json; // 로그아웃된 사용자의 번호
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
