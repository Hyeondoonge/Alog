import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledLink = styled(Link)`
  color: ${(props) => props.color};
  font-size: inherit;
  font-weight: 900;
  text-align: center;
  &:link {
    color: ${(props) => props.color};
    text-decoration: none;
  }
`;

export default function Logo() {
  const theme = useContext(ThemeContext);
  return (
    <StyledLink to="/" color={theme.main}>
      ALOG
    </StyledLink>
  );
}
