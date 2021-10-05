import { useContext, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTextFieldWrapper = styled.div`
  width: 100%;
  border: 1.5px solid ${(props) => props.color};
  border-radius: 25px;
  box-shadow: 0 0 3px 1px ${(props) => props.color};
  font-size: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTextField = styled.input`
  width: 87%;
  margin: 2% 3%;
  font-size: inherit;
  border: 0px;
  background-color: ${(props) => props.background};
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
          background={theme.background}
          onChange={handleChange}
        />
        {/* indorment */}
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
