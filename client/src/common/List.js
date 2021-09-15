import styled from 'styled-components';

const StyledList = styled.div`
  flex-wrap: wrap;
  display: flex;
  position: relative;
  & * {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

export default function List({ children }) {
  return <StyledList>{children}</StyledList>;
}
