import styled from 'styled-components';

const StyledTemplate = styled.div`
  width: 100%;
  font-size: 2rem;
  @media screen and (min-width: 600px) {
    & > * {
      margin: 5% 10% !important;
    }
  }
  & > * {
    margin: 7% 5%;
  }
`;

export default function Template({ children }) {
  return <StyledTemplate>{children}</StyledTemplate>;
}
