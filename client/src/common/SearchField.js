import { useContext, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTextFieldWrapper = styled.div`
  width: ${({ size }) => (size ? `${size}%;` : '100%;')}
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
export default function SearchField({ placeholder, handleFocus, handleChange, handleRemove }) {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

  return (
    <div>
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
    </div>
  );
}
