import { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledLogo = styled.h1`
  color: ${(props) => props.color};
  font-size: 6rem;
  text-align: center;
`;

export default function Logo() {
  const theme = useContext(ThemeContext);
  return <StyledLogo color={theme.main}>ALOG</StyledLogo>;
}
