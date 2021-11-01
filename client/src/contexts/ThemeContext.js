import { createContext } from 'react';

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const theme = {
    main: '#9BC9B1',
    background: '#353535',
    font: '#FFFFFF',
    content: '#FCFDFE'
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;

export { ThemeContextProvider };
