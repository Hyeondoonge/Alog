import { useContext, useRef, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import TextField from '../common/TextField';
import { fetchLanguagesByKeword } from './fetchApis';
import styled from 'styled-components';

// 내가 정의한 select ..? click이나 blur같은 건 처리했지만
// 아래 방향키 눌렀을 때 값이 입력되는 것 처리 못함. ㅠ^ㅠ
// select 태그 커스텀

const StyledList = styled.ul`
  list-style: none;
  font-size: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  display: none;
`;

const StyledItem = styled.li`
  padding: 1rem 2rem;
  &:hover {
    font-weight: 600;
    color: ${(props) => props.color};
  }
  &:not(:last-child) {
    border-bottom: 1px solid #cbcbcb;
  }
`;

export default function LanguageField({ language, setLanguage }) {
  const theme = useContext(ThemeContext);
  const [languageItems, setLanguageItems] = useState([]);
  const listRef = useRef(null);
  const alertRef = useRef(null);

  const onChange = async (event) => {
    alertRef.current.style.opacity = 0;
    const keyword = event.target.value;
    setLanguage(keyword);

    if (!keyword) {
      listRef.current.style.display = 'none';
      setLanguageItems([]);
      return;
    }

    fetchLanguagesByKeword(keyword, (res) => {
      const { languages } = res;
      if (languages.length) listRef.current.style.display = 'block';
      setLanguageItems(languages);
    });
    // 키워드에 대응하는 언어 리스트를 받아와서 렌더링. => 어떻게 효율적으로 렌더링할 수 있을까?
  };

  const onFocus = () => {
    listRef.current.style.display = 'block';
  };

  const onBlur = () => {
    // 대소문자 구별없이 효율성 검사해야하고
    // 서버로 부터 받은 정확한 데이터 값으로 변경
    listRef.current.style.display = 'none';

    if (!language) return;

    let newLanguage = '';
    if (
      languageItems.some(({ name }) => {
        newLanguage = name;
        return name.toUpperCase() === language.toUpperCase();
      })
    ) {
      document.querySelector('input[name=language]').value = newLanguage;
      setLanguage(newLanguage);
    } else {
      alertRef.current.style.opacity = 1;
    }
  };

  const onMouseDown = (event) => {
    const newLanguage = event.target.innerText;
    document.querySelector('input[name=language]').value = newLanguage;
    setLanguage(newLanguage);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onBlur={onBlur} onFocus={onFocus}>
        <TextField name="language" label="언어" placeholder="ex) C++" onChange={onChange} />
      </div>
      <span
        ref={alertRef}
        style={{
          color: '#FA3737',
          fontSize: '1.5rem',
          transition: 'opacity 1s',
          opacity: 0
        }}
      >
        입력할 수 없는 언어입니다
      </span>
      <div
        style={{
          width: '15rem',
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 5,
          fontSize: 'inherit',
          position: 'absolute'
        }}
      >
        <StyledList ref={listRef} onMouseDown={onMouseDown}>
          {languageItems.map(({ _id, name }) => (
            <StyledItem key={_id} color={theme.main}>
              {name}
            </StyledItem>
          ))}
        </StyledList>
      </div>
    </div>
  );
}
