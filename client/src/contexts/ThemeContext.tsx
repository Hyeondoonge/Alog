import { createContext } from 'react';

const theme = {
  main: '#9BC9B1',
  background: '#222222',
  font: '#FFFFFF',
  content: '#FCFDFE'
} as const;

const ThemeContext = createContext(theme);

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;

export { ThemeContextProvider };
