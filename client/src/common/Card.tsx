import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: ${(props) => props.color ?? 'white'};
  color: black;
  border-radius: 10px;
  padding: 5rem 3.5rem;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5%);
    box-shadow: 0px 0px 1px 1px #9bc9b1;
  }
`;

interface CardProps {
  color?: string;
  children: React.ReactNode;
}

export default function Card({ color, children }: CardProps) {
  return <StyledCard color={color}>{children}</StyledCard>;
}
