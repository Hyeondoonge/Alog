import Home from './page/Home';
import ReadPost from './page/ReadPost';
import Error from './page/Error';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';
import UserContext, { UserContextProvider } from './contexts/UserContext';
import SignUp from './page/SignUp';
import { Suspense, lazy, useContext, useEffect } from 'react';
import useToken from './hooks/useToken';
import UserHome from './page/UserHome';
import jwtDecode from 'jwt-decode';
import Loading from './common/Loading';
const WritePost = lazy(() => import('./page/WritePost'));
const EditPost = lazy(() => import('./page/EditPost'));

const MyComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn, userData, setUserData] = useContext(UserContext);
  const [getValidToken] = useToken();

  useEffect(() => {
    (async () => {
      try {
        // 자동로그인
        const accessToken = await getValidToken();
        if (!accessToken) return;
        const { userId } = jwtDecode(accessToken);
        setUserData({ ...userData, userId: userId });
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <>{children}</>;
};

export default function App() {
  return (
    <ThemeContextProvider>
      <ModalContextProvider>
        <UserContextProvider>
          <Suspense
            fallback={
              <div
                style={{
                  height: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Loading />
              </div>
            }
          >
            <MyComponent>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="home/:ownerId" element={<UserHome />} />
                  <Route path="write" element={<WritePost />} />
                  <Route path="edit" element={<EditPost />} />
                  <Route path="post" element={<ReadPost />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </Router>
            </MyComponent>
          </Suspense>
        </UserContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}
