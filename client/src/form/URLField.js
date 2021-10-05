import { useContext, useRef } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import useDebounce from '../hooks/useDebounce';

// 재사용하기 위해서가 아니라 로직 분리를 위함

export function URLField({ setTitleAndPlatform }) {
  const theme = useContext(ThemeContext);
  const alertRef = useRef(null);
  const hrRef = useRef(null);
  const debounce = useDebounce();

  const parseFromURL = async (url) => {
    try {
      const res = await fetch(url, {
        headers: { 'Content-type': 'text/html' }
      });
      if (res.status === 404) return new Error('unvalid url error');
      const parser = new DOMParser();
      const html = await res.text();
      const doc = parser.parseFromString(html, 'text/html');

      let title = '',
        platform = '';

      if (url.startsWith('https://programmers.co.kr')) {
        platform = 'programmers';
        title = doc.querySelector('.algorithm-title').innerHTML.trim();
      } else if (url.startsWith('https://www.acmicpc.net')) {
        platform = 'baekjoon';
        title = document.querySelector('#problem_title').innerHTML.trim();
      }
      return [title, platform];
    } catch (error) {}
  };

  const onFocus = () => {
    hrRef.current.style.border = `1px solid ${theme.main}`;
  };

  const onBlur = () => {
    hrRef.current.style.border = `1px solid white`;
  };

  const onChange = (event) => {
    const url = event.target.value;
    alertRef.current.style.opacity = 0;
    debounce(async () => {
      if (!url) return;
      try {
        const [title, platform] = await parseFromURL(url);
        setTitleAndPlatform(title, platform); // ...post, title, platform => 무의미한 post 전달할 필요가 없어졌다.
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
