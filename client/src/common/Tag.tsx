import { useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTag = styled.span<{ color: string; size?: number }>`
  color: black;
  background-color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? `${props.size}rem` : 'inherit')};
  padding: 0.1rem 1rem;
  cursor: pointer;
  border-radius: 3rem;
`;

interface TagProps {
  label: string;
  size?: number;
}

export default function Tag({ label, size }: TagProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledTag color={theme.main} size={size}>
      {label}
    </StyledTag>
  );
}
