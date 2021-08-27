import { useContext, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

// input?
// 사용자 정보 입력할 때도 쓰일 듯

const StyledTextFieldWrapper = styled.div`
  border: 1.5px solid ${(props) => props.color};
  border-radius: 25px;
  box-shadow: 0 0 3px 1px ${(props) => props.color};
  padding: 2% 3%;
  font-size: 3rem;
  display: flex;
  flex-direction: row;
`;

const StyledTextField = styled.input`
  font-size: inherit;
  border: 0px;
  &:focus {
    outline: none;
  }
`;

export default function TextField({ size, placeholder, handleChange, handleKeyUp }) {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

  return (
    <StyledTextFieldWrapper color={theme.main}>
      <StyledTextField
        ref={inputRef}
        size={size}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => {
          inputRef.current.value = '';
        }}
      >
        ✖️
      </span>
    </StyledTextFieldWrapper>
  );
}
