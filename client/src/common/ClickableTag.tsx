import ThemeContext from 'contexts/ThemeContext';
import { useContext } from 'react';
import styled from 'styled-components';

const StyledClickbaleTag = styled.label<{ size?: number; backgroundColor: string; main: string }>`
  color: white;
  background-color: ${(props) => props.backgroundColor};
  font-size: ${(props) => (props.size ? `${props.size}rem` : 'inherit')};
  padding: 1rem 1.5rem;
  border-radius: 3rem;
  cursor: pointer;
  transition: background-color 0.4s;

  input {
    appearance: none;
    margin: 0;
  }

  &:hover {
    box-shadow: 0 0 2px 1px #eee;
  }

  &:has(:focus-visible) {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:has(:checked) {
    color: black;
    background-color: ${(props) => props.main};
  }
`;

interface ClickableTagProps {
  label: string;
  selected: boolean;
  handleClick: () => void;
  size?: number;
}

export default function ClickbaleTag({ size, label, selected, handleClick }: ClickableTagProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledClickbaleTag size={size} backgroundColor={theme.background} main={theme.main}>
      {label}
      <input type="checkbox" name="categories" onChange={handleClick} checked={selected} />
    </StyledClickbaleTag>
  );
}
