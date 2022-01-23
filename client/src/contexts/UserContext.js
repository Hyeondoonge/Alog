import { createContext, useState } from 'react';
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    userId: null,
    profile_fileName: window.localStorage.getItem('profile_fileName') || null,
    api_accessToken: window.localStorage.getItem('api_accessToken') || null,
    api_refreshToken: window.localStorage.getItem('api_refreshToken') || null,
    accessToken: window.localStorage.getItem('accessToken') || null,
    refreshToken: window.localStorage.getItem('refreshToken') || null
  });

  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn, userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserContextProvider };
