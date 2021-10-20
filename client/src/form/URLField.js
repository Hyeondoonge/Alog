import { useContext, useRef } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import useDebounce from '../hooks/useDebounce';
import Platform from './Platform';

// 재사용하기 위해서가 아니라 로직 분리를 위함

// platform 클래스를 이용하는 client는 내부 타입에 대해서 알지않게함.
// 새로운 플랫폼에 신경쓰지 않고 유연한 처리 가능해짐.

export function URLField({ setPlatformAndTitle }) {
  const theme = useContext(ThemeContext);
  const alertRef = useRef(null);
  const hrRef = useRef(null);
  const debounce = useDebounce();

  const onFocus = () => {
    hrRef.current.style.border = `1px solid ${theme.main}`;
  };

  const onBlur = () => {
    hrRef.current.style.border = `1px solid white`;
  };

  const fetchPlatformAndTitle = async (url) => {
    // 입력된 url로부터 document를 획득
    try {
      const platform = new Platform(url);
      const res = await fetch(platform.getUrl(), {
        headers: { 'Content-type': 'text/html' }
      });
      const parser = new DOMParser();
      const html = await res.text();
      const doc = parser.parseFromString(html, 'text/html');
      platform.setProblemTitle(doc);

      return [platform.getName(), platform.getProblemTitle()];
    } catch (error) {
      throw new Error('unvalid url error');
    }
  };

  const onChange = (event) => {
    const url = event.target.value;
    alertRef.current.style.opacity = 0;
    debounce(async () => {
      if (!url) return;
      try {
        const [name, title] = await fetchPlatformAndTitle(url);
        setPlatformAndTitle(name, title);
      } catch (error) {
        alertRef.current.style.opacity = 1;
        return;
      }
    }, 1500);
  }; // 모듈 이름에 맞게 기능 구현하기

  return (
    <>
      <input
        style={{
          border: 'none',
          outline: 'none',
          width: '100%',
          fontSize: '2rem',
          backgroundColor: theme.background
        }}
        placeholder="문제의 링크를 올려 풀이의 제목을 완성해보세요"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <hr ref={hrRef} style={{ border: '1px solid white', marginBottom: 0 }} />
      <span
        ref={alertRef}
        style={{
          color: '#FA3737',
          fontSize: '1.5rem',
          transition: 'opacity 1s',
          opacity: 0
        }}
      >
        유효하지 않은 링크입니다
      </span>
    </>
  );
}
