import { createContext } from 'react';

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const theme = {
    main: '#5f939a',
    font: '#FFFFFF',
    content: '#FCFDFE'
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;

export { ThemeContextProvider };
