import { useContext, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

// sm, lg, .. 등에 따라 width, border 등등 지정할 수 있도록 styled 수정

const TypographyWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  border: 1px solid black;
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
  width: ${({ size }) => (size ? `${size}%;` : '100%;')}
  border: 1.5px solid white;
  border-radius: 5px;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
`;

const StyledTextField = styled.input`
  width: 100%;
  margin: 2% 3%;
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

export default function TextField({ label, size, placeholder, onChange }) {
  const inputRef = useRef(null);
  const highlightRef = useRef(null);
  const theme = useContext(ThemeContext);

  const onFocus = () => {
    highlightRef.current.style.transition = 'width 1s';
    highlightRef.current.style.width = '100%';
    inputRef.current.style.borderColor = theme.main;
    inputRef.current.style.boxShadow = `0 0 3px 1px ${theme.main}`;
  };

  const onBlur = () => {
    highlightRef.current.style.transition = 'width 0s';
    highlightRef.current.style.width = '0%';
    inputRef.current.style.borderColor = 'white';
    inputRef.current.style.boxShadow = `none`;
  };

  return (
    <div>
      <Typography highlightRef={highlightRef}>{label}</Typography>
      <StyledTextFieldWrapper
        ref={inputRef}
        color={theme.main}
        size={size}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <StyledTextField type="text" placeholder={placeholder} onChange={onChange} />
      </StyledTextFieldWrapper>
    </div>
  );
}
