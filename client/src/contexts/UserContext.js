import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { fetchAutoSignin_POST } from '../api/authAPI';

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
        const { userId } = await fetchAutoSignin_POST(accessToken);
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
