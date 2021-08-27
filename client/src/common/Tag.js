import { useContext } from 'react';
import styled, { css } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

// clickableTag인 것과 아닌 것으로, 고차 컴포넌트 만들기

const StyledTag = styled.span`
  font-size: ${(props) => props?.size ?? '1.5'}rem;
  border: 1.5px solid ${(props) => props.color};
  cursor: pointer;
  padding: 0.4em 0.7em;
  border-radius: 1.5rem;
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

export default function Tag({ label, size, selected, handleClick }) {
  const theme = useContext(ThemeContext);

  return (
    <StyledTag color={theme.main} size={size} selected={selected} onClick={handleClick}>
      {label}
    </StyledTag>
  );
}
