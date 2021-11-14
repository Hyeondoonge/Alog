import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { fetchAutoSignin_GET, fetchRefreshToken_GET } from '../api/authApi';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    api_accessToken: null,
    userId: null,
    accessToken: null
  });

  useEffect(() => {
    (async () => {
      try {
        // 갖고 있는 access token이 있다면 user 로그인 정보를 업데이트한다.
        const accessToken = window.localStorage.getItem('access_token');
        if (!accessToken) return;
        const res = await fetchAutoSignin_GET(accessToken);
        const { userId, msg } = await res.json();

        const refreshToken = window.localStorage.getItem('refresh_token');

        if (msg === '토큰 만료') {
          const res = await fetchRefreshToken_GET(refreshToken);
          const { accessToken: new_accessToken, refreshToken: new_refreshToken } = await res.json();
          window.localStorage.setItem('access_token', new_accessToken);
          if (new_refreshToken) window.localStorage.setItem('refresh_token', new_refreshToken);
        }
        setUserData({ userId: userId, accessToken });
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn, userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserContextProvider };
