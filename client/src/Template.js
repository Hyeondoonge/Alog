import styled from 'styled-components';

const StyledTemplate = styled.div`
  padding: 5% 15%;
`;

export default function Template({ children }) {
  return <StyledTemplate>{children}</StyledTemplate>;
}
