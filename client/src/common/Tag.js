import { useContext } from 'react';
import styled, { css } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTag = styled.span`
  font-size: 1.5rem;
  border: 1.5px solid ${(props) => props.color};
  cursor: pointer;
  padding: 0.4em 0.7em;
  border-radius: 16px;
  transition: 0.4s;
  &:hover {
    box-shadow: 0 0 2px 1px #eee;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: ${props.color};
      color: white;
    `}
`;

export default function Tag({ label, selected, handleClick }) {
  const theme = useContext(ThemeContext);

  return (
    <StyledTag color={theme.main} selected={selected} onClick={handleClick}>
      {label}
    </StyledTag>
  );
}
