import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';
import useDebounce from 'hooks/useDebounce';
import { OptionQueryString } from 'utils';
import { useHistory } from 'react-router-dom';
import useOptionStore from 'store/option';

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

  &:focus-within {
    outline: -webkit-focus-ring-color auto 5px;
  }
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

// TODO: 전역상태 사용 및 특수한 작업이 추가됨에 따라 재사용이 어려워짐, 추후 개선 필요
export default function SearchField() {
  const [immediateKeyword, setImmediateKeyword] = useState('');
  const setKeyword = useOptionStore((state) => state.setKeyword);

  const debounce = useDebounce();

  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);

  const history = useHistory();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setImmediateKeyword(newKeyword);
    debounce(() => {
      setKeyword(newKeyword);
      const urlSearchParams = OptionQueryString.createQSUsingKeyword(newKeyword);
      history.push(`/?${urlSearchParams.toString()}`);
    }, 550);
  };

  useEffect(() => {
    function init() {
      const { keyword } = OptionQueryString.getOption();
      setImmediateKeyword(keyword);
      setKeyword(keyword);
    }

    init();

    window.addEventListener('popstate', init);
    return () => {
      window.removeEventListener('popstate', init);
    };
  }, []);

  return (
    <div>
      <StyledTextFieldWrapper color={theme.main} background={theme.background}>
        <StyledTextField
          ref={inputRef}
          value={immediateKeyword}
          type="text"
          placeholder={'찾는 풀이의 문제제목을 입력해보세요.'}
          onChange={handleChange}
        />
      </StyledTextFieldWrapper>
    </div>
  );
}
