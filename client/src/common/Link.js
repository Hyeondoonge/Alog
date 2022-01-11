import styled from 'styled-components';
import { Link as OldLink } from 'react-router-dom';
const StyledText = styled.span`
  color: white;
  font-size: inherit;
`;

export default function Link({ to, replace, children }) {
  return (
    <OldLink to={to} replace={replace}>
      <StyledText>{children}</StyledText>
    </OldLink>
  );
}
