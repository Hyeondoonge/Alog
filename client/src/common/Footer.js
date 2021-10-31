import { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledFooter = styled.div`
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 90vh;
  left: 0;
`;

export default function Footer({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <StyledFooter>
      <div style={{ backgroundColor: theme.background, padding: 10 }}>{children}</div>
    </StyledFooter>
  );
}
