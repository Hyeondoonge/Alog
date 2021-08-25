import styled from 'styled-components';

const StyledTemplate = styled.div`
  padding: 5%;
`;

export default function Template({ children }) {
  return <StyledTemplate>{children}</StyledTemplate>;
}
