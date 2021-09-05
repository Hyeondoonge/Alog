import styled from 'styled-components';

const StyledTemplate = styled.div`
  @media screen and (min-width: 600px) {
    padding: 5% 15%;
  }

  @media screen and (max-width: 600px) {
    padding: 5% 5%;
  }
`;

export default function Template({ children }) {
  return <StyledTemplate>{children}</StyledTemplate>;
}
