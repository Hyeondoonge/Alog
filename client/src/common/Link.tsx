import styled from 'styled-components';
import { Link as OldLink } from 'react-router-dom';

const StyledText = styled.span`
  color: white;
  font-size: inherit;
`;

interface LinkProps {
  to: string;
  replace?: boolean;
  children: React.ReactNode;
}

export default function Link({ to, replace, children }: LinkProps) {
  return (
    <OldLink to={to} replace={replace}>
      <StyledText>{children}</StyledText>
    </OldLink>
  );
}
