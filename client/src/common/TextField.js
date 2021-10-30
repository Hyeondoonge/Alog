import { useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const styleWithWidth = {
  wrapper: {
    true: css`
      --wrapper-width: 100%;
    `
  },
  field: {
    true: css`
      --textfield-margin: 2%;
    `
  }
};

const StyledWrapper = styled.div`
  &:focus-within {
    & > *:first-child > div {
      transition: width 1s;
      width: 100%;
    }
    & > *:last-child {
      box-shadow: 0 0 3px 1px ${(props) => props.color};
    }
    & > *:last-child > * {
      box-shadow: none;
      outline: none;
    }
  }
`;

const TypographyWrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;

const StyledHighlight = styled.div`
  width: 0%;
  height: 1.5rem;
  position: relative;
  top: -1.5rem;
  z-index: -999;
  background-color: ${(props) => props.color};
  opacity: 0.8;
`;

const StyledTextFieldWrapper = styled.div`
  ${(props) => props.styleWithWidth};
  width: var(--wrapper-width, 15%);
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0 0 0.3rem 0.05rem black;
`;

const StyledTextField = styled.input`
  ${(props) => props.styleWithWidth};
  width: 100%;
  margin: var(--textfield-margin, 11%);
  font-size: inherit;
  border: 0px;
`;

function Typography({ highlightRef, highlightColor, children, option }) {
  return (
    <>
      <TypographyWrapper>
        <span
          style={{
            fontSize: option?.fontSize ?? '2rem',
            fontWeight: option?.fontWeight ?? 500
          }}
        >
          {children}
        </span>
        <StyledHighlight ref={highlightRef} className="highlight" color={highlightColor} />
      </TypographyWrapper>
    </>
  );
}

export default function TextField({
  label,
  name,
  value,
  maxLength,
  placeholder,
  fullWidth,
  onChange
}) {
  const theme = useContext(ThemeContext);
  const wrapperStyleWithWidth = fullWidth && styleWithWidth.wrapper[fullWidth];
  const fieldStyleWithWidth = fullWidth && styleWithWidth.field[fullWidth];

  return (
    <StyledWrapper color={theme.main}>
      {label && <Typography highlightColor={theme.main}>{label}</Typography>}
      <StyledTextFieldWrapper
        backgroundColor={theme.background}
        styleWithWidth={wrapperStyleWithWidth}
      >
        <StyledTextField
          type="text"
          name={name}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete="off"
          backgroundColor={theme.background}
          styleWithWidth={fieldStyleWithWidth}
          onChange={onChange}
        />
      </StyledTextFieldWrapper>
    </StyledWrapper>
  );
}
