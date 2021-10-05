import { useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

// SearchField와 통합할 수 있을 것 같다 -> TextField에서 endorment 하나 더 붙은 것
// 비슷한 코드인데도 통합하지 않으면 따로 관리해야므로 시간 x2배

// field의 width나 height에 대한 %가 margin에 적용됨.

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
  },
  area: {
    true: css`
      --textarea-margin: 2%;
    `
  }
};

const TypographyWrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;

const StyledHighlight = styled.div`
  width: 0%;
  height: 1rem;
  position: relative;
  top: -1rem;
  z-index: -999;
  background-color: #5f939a;
  opacity: 0.8;
`;

const StyledTextFieldWrapper = styled.div`
  ${(props) => props.styleWithWidth};
  width: var(--wrapper-width, 15%);
  border: 1.5px solid white;
  border-radius: var(--wrapper-border-radius, 5px);
  font-size: 2rem;
  display: flex;
  flex-direction: row;
`;

const StyledTextField = styled.input`
  ${(props) => props.styleWithWidth};
  width: 100%;
  margin: var(--textfield-margin, 11%);
  font-size: inherit;
  background-color: ${(props) => props.backgroundColor};
  border: 0px;
  &:focus {
    outline: none;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  ${(props) => props.styleWithWidth};
  margin: var(--textarea-margin, 11%);
  resize: none;
  background-color: ${(props) => props.backgroundColor};
  color: white;
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
  maxLength,
  placeholder,
  fullWidth,
  rows,
  onChange
}) {
  const inputRef = useRef(null);
  const highlightRef = useRef(null);
  const theme = useContext(ThemeContext);
  const wrapperStyleWithWidth = fullWidth && styleWithWidth.wrapper[fullWidth];
  const fieldStyleWithWidth = fullWidth && styleWithWidth.field[fullWidth];
  const areaStyleWithWidth = fullWidth && styleWithWidth.area[fullWidth];

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
        {rows ? (
          <StyledTextArea
            name={name}
            rows={rows}
            placeholder={placeholder}
            backgroundColor={theme.background}
            styleWithWidth={areaStyleWithWidth}
            onChange={onChange}
          />
        ) : (
          <StyledTextField
            type="text"
            name={name}
            maxLength={maxLength}
            placeholder={placeholder}
            autoComplete="off"
            backgroundColor={theme.background}
            styleWithWidth={fieldStyleWithWidth}
            onChange={onChange}
          />
        )}
      </StyledTextFieldWrapper>
    </div>
  );
}
