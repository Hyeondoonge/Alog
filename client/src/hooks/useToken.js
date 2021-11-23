import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function useToken() {
  const [_, __, userData, setUserData] = useContext(UserContext);

  // 인가를 위한 함수 authorization
  // 성공적으로 token이 확인됐다면 payload를 반환
  // access_token 업데이트를 수행 후 바로 access_token을 읽으면 이전값이 읽혀지는 문제 때문에,
  // 갱신 된 새로운 토큰에 대한 데이터를 authorization에서 반환해주도록 한다.
  // 검사 실패할 경우 null 발급

  const refreshToken = async (token) => {
    const res = await fetch('/api/auth/refreshToken', {
      headers: { authorization: `Bearer ${token}` }
    });
    const { accessToken: new_accessToken } = await res.json();
    return new_accessToken;
  };

  const getValidToken = async () => {
    if (!userData.accessToken || !userData.refreshToken) return;

    const res = await fetch('/api/auth/verifyToken', {
      headers: { Authorization: `Bearer ${userData.accessToken}` }
    });
    if (res.status !== 401) return userData.accessToken;
    const { msg, error } = await res.json();

    if (error === 'expired token') {
      // access token 유효성 검증 실패이유가 토큰 만료일 때
      const accessToken = await refreshToken(userData.refreshToken);
      setUserData({ ...userData, accessToken: accessToken });
      window.localStorage.setItem('access_token', accessToken);
      return accessToken;
    }
    // access token 유효성 검증 실패이유가 토큰 만료 외의 이유일 때 (올바르지 않은 접근)
    return null;
  };

  const requestService = async (request) => {
    let accesToken = await getValidToken();
    if (!accesToken) return;
    let res = await request()(accesToken);

    if (res.error === 'expired token') {
      accesToken = await refreshToken(userData.refreshToken);
      if (!accesToken) return;
      res = await request()(accesToken);
    }
    return res;
  };

  return [getValidToken, requestService];
}
