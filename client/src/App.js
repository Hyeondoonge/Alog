import Template from './Template';
import Home from './page/Home';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <div className="App">
        <Template>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </Router>
        </Template>
      </div>
    </ThemeContextProvider>
  );
}
