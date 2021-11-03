import { useContext, useRef, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import TextField from '../common/TextField';
import { fetchLanguage_GET } from './fetchApis';
import styled from 'styled-components';
import Tag from '../common/Tag';

// 아래 방향키 눌렀을 때 값이 입력되는 것 미구현상태

const StyledList = styled.ul`
  list-style: none;
  font-size: 2rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const StyledItem = styled.li`
  padding: 1rem 2rem;
  &:hover {
    background-color: ${(props) => props.color};
    color: white;
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

    if (!keyword) {
      listRef.current.style.display = 'none';
      setLanguageItems([]);
      return;
    }

    fetchLanguage_GET(keyword, (res) => {
      const { languages } = res;
      if (languages.length) listRef.current.style.display = 'block';
      else listRef.current.style.display = 'none';
      setLanguageItems(languages);
    });
  };

  const onFocus = () => {
    if (languageItems.length) listRef.current.style.display = 'block';
  };

  const onBlur = (event) => {
    // 대소문자 구별없이 효율성 검사해야하고
    // 서버로 부터 받은 정확한 데이터 값으로 변경
    listRef.current.style.display = 'none';

    const value = event.target.value;
    if (!value) {
      setLanguage('');
      return;
    }

    let newLanguage = '';
    if (
      languageItems.some(({ name }) => {
        newLanguage = name;
        return name.toUpperCase() === value.toUpperCase();
      })
    ) {
      // dom직접 제어... 음...
      document.querySelector('input[name=language]').value = newLanguage;
      setLanguage(newLanguage);
    } else {
      alertRef.current.style.opacity = 1;
      setLanguage('');
    }
  };

  const onMouseDown = (event) => {
    const newLanguage = event.target.innerText;
    document.querySelector('input[name=language]').value = newLanguage;
    setLanguage(newLanguage);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
        <div onBlur={onBlur} onFocus={onFocus}>
          <TextField name="language" label="언어" placeholder="ex. C++" onChange={onChange} />
        </div>
        {language && (
          <div style={{ margin: 15 }}>
            <Tag label={language} size="2" />
          </div>
        )}
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
        ref={listRef}
        style={{
          width: 'fit-content',
          backgroundColor: `#2C2D2D`,
          color: '#ABABAB',
          fontSize: 'inherit',
          position: 'absolute',
          zIndex: 1,
          boxShadow: '5px 5px 5px 0px black',
          opacity: 0.95
        }}
      >
        <StyledList onMouseDown={onMouseDown}>
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
