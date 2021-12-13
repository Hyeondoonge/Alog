import Home from './page/Home';
import WritePost from './page/WritePost';
import EditPost from './page/EditPost';
import ReadPost from './page/ReadPost';
import Error from './page/Error';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';
import UserContext, { UserContextProvider } from './contexts/UserContext';
import SignUp from './page/SignUp';
import { useContext, useEffect } from 'react';
import useToken from './hooks/useToken';

const MyComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn, userData, setUserData] = useContext(UserContext);
  const [getValidToken] = useToken();

  useEffect(() => {
    (async () => {
      try {
        // 자동로그인
        const accessToken = await getValidToken();
        if (!accessToken) return;
        // authorization 호출을 통해 토큰이 인증된 상태이며 유효한 access_token을 가지고 있음.
        // 유저 정보 업데이트를 위해 client 단에서 token을 읽어내 유저 정보를 얻는다
        const { userId } = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
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
          <MyComponent>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/write" exact component={WritePost} />
                <Route path="/edit" exact component={EditPost} />
                <Route path="/post" exact component={ReadPost} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/*" exact component={Error} />
                {/* edit/:postsId */}
              </Switch>
            </Router>
          </MyComponent>
        </UserContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}
