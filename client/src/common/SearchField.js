import { useContext, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTextFieldWrapper = styled.div`
  width: 100%;
  border-radius: 25px;
  box-shadow: 0 0 3px 2px #black;
  font-size: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.background};
  color: white;

  & :first-child {
    width: 90%;
    margin: 2% 3%;
  }
`;

const StyledTextField = styled.input`
  font-size: inherit;
  border: 0px;
  &:focus {
    outline: none;
  }
  color: white;
`;

// click 및 tab 발생 시 focus 이벤트로 처리
export default function SearchField({ placeholder, handleFocus, handleChange, handleRemove }) {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

  return (
    <div>
      <StyledTextFieldWrapper
        color={theme.main}
        onFocus={handleFocus}
        background={theme.background}
      >
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
          <RiCloseFill size="3rem" />
        </span>
      </StyledTextFieldWrapper>
    </div>
  );
}
