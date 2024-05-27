import { useContext } from 'react';
import styled, { css } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTag = styled.span<{ color: string; size?: number }>`
  color: black;
  background-color: ${(props) => props.color};
  font-size: ${(props) => (props.size ? `${props.size}rem` : 'inherit')};
  padding: 0.1rem 1rem;
  cursor: pointer;
  border-radius: 3rem;
`;

const StyledClickableTag = styled(StyledTag)<{ selected?: boolean; backgroundColor: string }>`
  ${(props) =>
    !props.selected &&
    css`
      background-color: ${props.backgroundColor} !important;
      color: white;
    `}
  transition: 0.4s;
  padding: 1rem 1.5rem !important;
  &:hover {
    box-shadow: 0 0 2px 1px #eee;
  }
`;

interface TagProps {
  label: string;
  size?: number;
  clickable?: boolean;
  selected?: boolean;
  handleClick?: () => void;
}

export default function Tag({ label, size, clickable, selected, handleClick }: TagProps) {
  const theme = useContext(ThemeContext);

  return !clickable ? (
    <StyledTag color={theme.main} size={size}>
      {label}
    </StyledTag>
  ) : (
    <StyledClickableTag
      color={theme.main}
      size={size}
      backgroundColor={theme.background}
      selected={selected}
      onClick={handleClick}
    >
      {label}
    </StyledClickableTag>
  );
}
