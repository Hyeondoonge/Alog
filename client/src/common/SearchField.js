import { useContext, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTextFieldWrapper = styled.div`
  border-radius: 25px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.background};
  color: white;
  padding: 20px 25px;
  box-shadow: 0px 0px 5px 0px #353535;
`;

const StyledTextField = styled.input`
  width: 100%;
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
        {/* <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            inputRef.current.value = '';
            handleRemove();
          }}
        >
          <RiCloseFill size="25px" />
        </span> */}
      </StyledTextFieldWrapper>
    </div>
  );
}
