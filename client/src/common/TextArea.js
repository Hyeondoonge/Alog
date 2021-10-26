import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

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

const StyledTextAreaWrapper = styled.div`
  width: var(--wrapper-width, 100%);
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0px 3px 3px 3px black;
`;

const StyledTextArea = styled.textarea`
  padding: 0;
  font: inherit;
  font-size: inherit;
  width: 100%;
  margin: var(--textarea-margin, 2%);
  resize: none;
  border: 0px;
  &:focus {
    outline: none;
  }
  height: auto;
  min-height: 50rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
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
  const textareaRef = useRef(null);
  const sideTextareaRef = useRef(null);
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

  const resizeTextarea = (value) => {
    const textarea = textareaRef.current;
    sideTextareaRef.current.value = value;
    sideTextareaRef.current.style.height = 'auto';
    textarea.style.height = `${sideTextareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextarea(value);
  }, [value]);

  return (
    <div>
      {label && <Typography highlightRef={highlightRef}>{label}</Typography>}
      <StyledTextAreaWrapper
        ref={inputRef}
        backgroundColor={theme.background}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <StyledTextArea
          ref={textareaRef}
          name={name}
          value={value}
          placeholder={placeholder}
          backgroundColor={theme.background}
          onChange={onChange}
        />
        <StyledTextArea
          ref={sideTextareaRef}
          style={{ visibility: 'hidden', position: 'absolute' }}
        />
      </StyledTextAreaWrapper>
    </div>
  );
}
