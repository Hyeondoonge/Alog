import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

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
  width: var(--wrapper-width, 100%);
  border: 1.5px solid white;
  border-radius: var(--wrapper-border-radius, 5px);
  font-size: 2rem;
  display: flex;
  flex-direction: row;
`;

const StyledTextArea = styled.textarea`
  font: inherit;
  font-size: inherit;
  width: 100%;
  margin: var(--textarea-margin, 2%);
  resize: none;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: 0px;
  &:focus {
    outline: none;
  }
  min-height: 50rem;
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

export default function TextArea({ label, name, value, placeholder, rows, onChange }) {
  const inputRef = useRef(null);
  const areaRef = useRef(null);
  const highlightRef = useRef(null);
  const theme = useContext(ThemeContext);

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

  useEffect(() => {
    areaRef.current.rows = areaRef.current.value.split('\n').length;

    // textarea 현재 line 수..> ㅠㅠ
  }, [value]);

  return (
    <div>
      {label && <Typography highlightRef={highlightRef}>{label}</Typography>}
      <StyledTextFieldWrapper
        ref={inputRef}
        backgroundColor={theme.background}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <StyledTextArea
          ref={areaRef}
          name={name}
          rows={rows}
          value={value}
          placeholder={placeholder}
          backgroundColor={theme.background}
          onChange={onChange}
        />
      </StyledTextFieldWrapper>
    </div>
  );
}
