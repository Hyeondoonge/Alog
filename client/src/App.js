import Home from './page/Home';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </ThemeContextProvider>
  );
}
