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
  background-color: #5f939a;
  opacity: 0.8;
`;

const StyledTextFieldWrapper = styled.div`
  ${(props) => props.styleWithWidth};
  width: var(--wrapper-width, 15%);
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0px 2px 2px 3px black;
`;

const StyledTextField = styled.input`
  ${(props) => props.styleWithWidth};
  width: 100%;
  margin: var(--textfield-margin, 11%);
  font-size: inherit;
  border: 0px;
  &:focus {
    outline: none;
  }
`;

function Typography({ highlightRef, children, option }) {
  return (
    <>
      <TypographyWrapper tabIndex={0}>
        <span
          style={{
            fontSize: option?.fontSize ?? '2rem',
            fontWeight: option?.fontWeight ?? 500
          }}
        >
          {children}
        </span>
        <StyledHighlight ref={highlightRef} className="highlight" />
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
  const inputRef = useRef(null);
  const highlightRef = useRef(null);
  const theme = useContext(ThemeContext);
  const wrapperStyleWithWidth = fullWidth && styleWithWidth.wrapper[fullWidth];
  const fieldStyleWithWidth = fullWidth && styleWithWidth.field[fullWidth];

  const onFocus = () => {
    if (highlightRef.current) {
      highlightRef.current.style.transition = 'width 1s';
      highlightRef.current.style.width = '100%';
    }
    inputRef.current.style.borderColor = theme.main;
    inputRef.current.style.boxShadow = `0 0 3px 1px ${theme.main}`;
  };

  const onBlur = () => {
    if (highlightRef.current) {
      highlightRef.current.style.transition = 'width 0s';
      highlightRef.current.style.width = '0%';
    }
    inputRef.current.style.borderColor = 'white';
    inputRef.current.style.boxShadow = `none`;
  };

  return (
    <div>
      {label && <Typography highlightRef={highlightRef}>{label}</Typography>}
      <StyledTextFieldWrapper
        ref={inputRef}
        backgroundColor={theme.background}
        styleWithWidth={wrapperStyleWithWidth}
        onFocus={onFocus}
        onBlur={onBlur}
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
    </div>
  );
}
