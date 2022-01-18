import { createContext, useState } from 'react';
const UserContext = createContext();

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    userId: null,
    profile_fileName: window.localStorage.getItem('profile_file_name') || null,
    api_accessToken: window.localStorage.getItem('api_access_token') || null,
    api_refreshToken: window.localStorage.getItem('api_refresh_token') || null,
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
