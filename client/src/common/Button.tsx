import ThemeContext from 'contexts/ThemeContext';
import { ReactNode, useContext } from 'react';
import styled, { CSSProperties, FlattenSimpleInterpolation, css } from 'styled-components';

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
} as const;

const StyledButton = styled.button<{
  backgroundColor: CSSProperties['backgroundColor'];
  styleWithSize: FlattenSimpleInterpolation;
}>`
  ${(props) => props.styleWithSize}

  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: var(--button-font-size, 2.5rem);
  padding: var(--button-padding, 1rem 2rem);
  border-radius: var(--button-border-radius, 1.6rem);
  background-color: ${(props) => props.backgroundColor};
  color: #ffffff;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

interface ButtonProps {
  label?: string | ReactNode;
  size?: keyof typeof styleWithSize;
  color?: CSSProperties['backgroundColor'];
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ label, size, color, disabled, onClick }: ButtonProps) {
  const style = styleWithSize[size || 'medium'];
  const theme = useContext(ThemeContext);

  return (
    <StyledButton
      backgroundColor={color || theme.main}
      disabled={disabled}
      styleWithSize={style}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
}
