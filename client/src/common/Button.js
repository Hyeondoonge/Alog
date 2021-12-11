// 크기별 버튼 구현

// https://www.daleseo.com/react-button-component/

import styled, { css } from 'styled-components';

const styleWithSize = {
  small: css`
    --button-font-size: 2rem;
    --button-padding: 0.5rem 1rem;
    --button-border-radius: 0.8rem;
  `,
  medium: css``,
  large: css`
    --button-font-size: 3rem;
    --button-padding: 2% 5%;
    --button-border-radius: 2rem;
  `
};

const StyledButton = styled.button`
  ${(props) => props.styleWithSize}

  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: var(--button-font-size, 2.5rem);
  padding: var(--button-padding, 1rem 2rem);
  border-radius: var(--button-border-radius, 1.6rem);
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
