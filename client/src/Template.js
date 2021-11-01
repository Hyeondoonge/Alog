import styled from 'styled-components';

const StyledTemplate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  @media screen and (min-width: 600px) {
    padding: 5% 10%;
  }
  padding: 10% 5%;
`;

export default function Template({ children }) {
  return <StyledTemplate>{children}</StyledTemplate>;
}
