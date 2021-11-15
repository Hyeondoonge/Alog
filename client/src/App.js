import Home from './page/Home';
import WritePost from './page/WritePost';
import EditPost from './page/EditPost';
import ReadPost from './page/ReadPost';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';
import UserContext, { UserContextProvider } from './contexts/UserContext';
import SignUp from './page/SignUp';
import { useContext, useEffect } from 'react';
import useAuthorization from './hooks/useAuthorizaiton';
import { fetchAutoSignin_GET } from './api/authApi';

const MyComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn, userData, setUserData] = useContext(UserContext);
  const authorization = useAuthorization();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await authorization();
        if (!accessToken) return;
        const res = await fetchAutoSignin_GET(accessToken);
        const { userId, msg } = await res.json();
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
                {/* edit/:postsId */}
              </Switch>
            </Router>
          </MyComponent>
        </UserContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}
