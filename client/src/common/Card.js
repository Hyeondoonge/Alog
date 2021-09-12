import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: ${(props) => props.color ?? 'white'};
  color: black;
  border-radius: 10px;
  padding: 5rem;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5%);
  }
`;

export default function Card({ color, children }) {
  return <StyledCard color={color}>{children}</StyledCard>;
}
