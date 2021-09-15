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
  width: 100%;
  font-size: inherit;
  border: 0px;
  &:focus {
    outline: none;
  }
`;

// click 및 tab 발생 시 focus 이벤트로 처리
export default function TextField({ placeholder, handleFocus, handleChange, handleRemove }) {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

  return (
    <StyledTextFieldWrapper color={theme.main} onFocus={handleFocus}>
      <StyledTextField
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => {
          inputRef.current.value = '';
          handleRemove();
        }}
      >
        ✖️
      </span>
    </StyledTextFieldWrapper>
  );
}
