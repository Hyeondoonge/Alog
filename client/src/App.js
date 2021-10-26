import Home from './page/Home';
import WritePost from './page/WritePost';
import EditPost from './page/EditPost';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { ModalContextProvider } from './contexts/ModalContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <ModalContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/write" exact component={WritePost} />
            <Route path="/edit" exact component={EditPost} />
            {/* edit/:postsId */}
          </Switch>
        </Router>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}
