import styled from 'styled-components';
import { Link as OldLink } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const StyledText = styled.span`
  color: white;
  font-size: inherit;

  & :hover {
    text-decoration: underline ${(props) => props.underlineColor};
  }
`;

export default function Link({ to, replace, children }) {
  const theme = useContext(ThemeContext);

  return (
    <OldLink to={to} replace={replace}>
      <StyledText underlineColor={theme.main}>{children}</StyledText>
    </OldLink>
  );
}
