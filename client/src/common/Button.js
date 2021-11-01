// 크기별 버튼 구현

// https://www.daleseo.com/react-button-component/

import styled, { css } from 'styled-components';

const styleWithSize = {
  small: css`
    --button-font-size: 20px;
    --button-padding: 5px 20px;
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
  font-weight: 600;
  font-size: var(--button-font-size, 25px);
  padding: var(--button-padding, 10px 20px);
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
