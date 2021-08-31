import { useContext } from 'react';
import styled, { css } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

// Extending styles
// 말 그대로 스타일을 확장해서 재사용할 수 있다. (=> 코드 중복 감소)

const StyledTag = styled.span`
  background-color: ${(props) => props.color};
  font-size: ${(props) => props?.size ?? '1.5'}rem;
  border: 1.5px solid ${(props) => props.color};
  cursor: pointer;
  padding: 0.4em 0.7em;
  border-radius: 1.5rem;
`;

const StyledClickableTag = styled(StyledTag)`
  ${(props) =>
    !props.selected &&
    css`
      background-color: transparent !important;
    `}
  transition: 0.4s;
  &:hover {
    box-shadow: 0 0 2px 1px #eee;
  }
`;

export default function Tag({ label, size, clickable, selected, handleClick }) {
  const theme = useContext(ThemeContext);

  return !clickable ? (
    <StyledTag color={theme.main} size={size}>
      {label}
    </StyledTag>
  ) : (
    <StyledClickableTag color={theme.main} selected={selected} onClick={handleClick} size={size}>
      {label}
    </StyledClickableTag>
  );
}
