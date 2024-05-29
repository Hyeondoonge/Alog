import { useContext, useRef } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const StyledTextFieldWrapper = styled.div<{ background: string }>`
  border-radius: 25px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.background};
  color: white;
  padding: 2rem 2.5rem;
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

interface SearchFieldProps {
  placeholder: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

// click 및 tab 발생 시 focus 이벤트로 처리
export default function SearchField({ placeholder, handleChange }: SearchFieldProps) {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

  return (
    <div>
      <StyledTextFieldWrapper color={theme.main} background={theme.background}>
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
