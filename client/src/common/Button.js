// 크기별 버튼 구현

// https://www.daleseo.com/react-button-component/

import styled, { css } from 'styled-components';

const styleWithSize = {
  small: css`
    --button-font-size: 1.5rem;
    --button-padding: 1% 2%;
    --button-border-radius: 8px;
  `,
  medium: css``,
  large: css`
    --button-font-size: 3rem;
    --button-padding: 2% 5%;
    --button-border-radius: 20px;
  `
};

const StyledButton = styled.button`
  ${(props) => props.styleWithSize}

  border: none;
  cursor: pointer;
  font-size: var(--button-font-size, 2rem);
  padding: var(--button-padding, 1.5% 3%);
  border-radius: var(--button-border-radius, 16px);
  background: ${(props) => props.color || 'default'};
  color: #ffffff;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

export default function Button({ label, size, color, disabled, onClick }) {
  const style = styleWithSize[size];

  return (
    <StyledButton color={color} disabled={disabled} styleWithSize={style} onClick={onClick}>
      {label}
    </StyledButton>
  );
}
