import { createContext, useState } from 'react';
const UserContext = createContext();

// 성능 테스트를 위한 초기 상태 설정
const isTestEnv = process.env.REACT_APP_ENV === 'test';

const initIsLoggedIn = isTestEnv ? true : false;
const initUserData = {
  userId: null,
  profile_fileName: window.localStorage.getItem('profile_fileName') || null,
  api_accessToken: window.localStorage.getItem('api_accessToken') || null,
  api_refreshToken: window.localStorage.getItem('api_refreshToken') || null,
  accessToken: window.localStorage.getItem('accessToken') || null,
  refreshToken: window.localStorage.getItem('refreshToken') || null
};

if (isTestEnv) {
  initUserData.userId = 'ALOG 테스터';
}

function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initIsLoggedIn);
  const [userData, setUserData] = useState(initUserData);

  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn, userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserContextProvider };
