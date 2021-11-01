import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

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

const StyledTextAreaWrapper = styled.div`
  width: var(--wrapper-width, 100%);
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0 0 0.3rem 0.05rem black;
`;

const StyledTextArea = styled.textarea`
  padding: 0;
  font: inherit;
  font-size: inherit;
  width: 100%;
  margin: var(--textarea-margin, 2%);
  resize: none;
  border: 0px;
  height: auto;
  min-height: 50rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
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
        <StyledHighlight ref={highlightRef} color={highlightColor} />
      </TypographyWrapper>
    </>
  );
}

export default function TextArea({ label, name, value, placeholder, onChange }) {
  const textareaRef = useRef(null);
  const sideTextareaRef = useRef(null);
  const theme = useContext(ThemeContext);

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
    <StyledWrapper color={theme.main}>
      {label && <Typography highlightColor={theme.main}>{label}</Typography>}
      <StyledTextAreaWrapper className="textarea-wrapper" backgroundColor={theme.background}>
        <StyledTextArea
          ref={textareaRef}
          name={name}
          value={value}
          placeholder={placeholder}
          backgroundColor={theme.background}
          onChange={onChange}
          color={theme.main}
        />
        <StyledTextArea
          ref={sideTextareaRef}
          style={{ visibility: 'hidden', position: 'absolute' }}
        />
      </StyledTextAreaWrapper>
    </StyledWrapper>
  );
}
