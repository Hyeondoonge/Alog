import { createContext } from 'react';

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const theme = {
    main: '#15C4D6',
    background: '#353535',
    font: '#FFFFFF',
    content: '#FCFDFE'
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;

export { ThemeContextProvider };
