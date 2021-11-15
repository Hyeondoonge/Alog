import { createContext, useDebugValue, useEffect, useState } from 'react';
import { fetchAutoSignin_GET } from '../api/authApi';
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    api_accessToken: null,
    userId: null,
    accessToken: window.localStorage.getItem('access_token') || null,
    refreshToken: window.localStorage.getItem('refresh_token') || null
  });

  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn, userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserContextProvider };
