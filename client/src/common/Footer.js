import { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledFooter = styled.div`
  width: 100vw;
  height: fit-content;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: ${(props) => props.background}00;
  backdrop-filter: blur(30px);
  box-shadow: -3px 0px 4px 0px black;
  margin: 5;
  z-index: 2;
`;

export default function Footer({ children }) {
  const theme = useContext(ThemeContext);
  return <StyledFooter background={theme.background}>{children}</StyledFooter>;
}
