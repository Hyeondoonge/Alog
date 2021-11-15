import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function useAuthorization() {
  const [_, __, userData, setUserData] = useContext(UserContext);

  // 인가를 위한 함수로 성공적으로 token이 발급된 경우 token을 발급
  // 검사 실패할 경우 null 발급
  const authorization = async () => {
    if (!userData.accessToken || !userData.refreshToken) return;

    const res = await fetch('/api/auth/verifyToken', {
      headers: { Authorization: `Bearer ${userData.accessToken}` }
    });
    if (res.status !== 401) return userData.accessToken;
    const { msg, error } = await res.json();

    if (error === 'expired token') {
      // access token 유효성 검증 실패이유가 토큰 만료일 때
      const res = await fetch('/api/auth/refreshToken', {
        headers: { authorization: `Bearer ${userData.refreshToken}` }
      });
      const { accessToken: new_acccessToken } = await res.json();
      setUserData({ ...userData, new_acccessToken });
      window.localStorage.setItem('access_token', new_acccessToken);
      return new_acccessToken;
    }
    // access token 유효성 검증 실패이유가 토큰 만료 외의 이유일 때 (올바르지 않은 접근)
    return null;
  };

  return authorization;
}
