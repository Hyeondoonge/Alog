import styled from 'styled-components';
import Template from '../Template';
import TextField from './TextField';
import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const ResponsiveImage = ({ src }) => (
  <div style={{}}>
    <img src={src} width="100%" height="100%" />
  </div>
);

export default function Form({ Button }) {
  const theme = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');

  const parseFromURL = async (url) => {
    if (!url) return;

    try {
      const res = await fetch(url, {
        headers: { 'Content-type': 'text/html' }
      });
      const parser = new DOMParser();
      const html = await res.text();
      const doc = parser.parseFromString(html, 'text/html');

      let problemTitle = null,
        platform = null;

      if (url.startsWith('https://programmers.co.kr')) {
        platform = 'programmers';
        problemTitle = doc.querySelector('.algorithm-title').innerHTML.trim();
      } else if (url.startsWith('https://www.acmicpc.net')) {
        platform = 'baekjoon';
        problemTitle = document.querySelector('#problem_title').innerHTML.trim();
      }
      setTitle(problemTitle);
      setPlatform(platform);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const onChange = () => {};

  return (
    <Template>
      <div style={{ height: 50 }}>
        {!title ? (
          <>
            <input
              onChange={(event) => {
                parseFromURL(event.target.value);
              }}
              style={{ border: 'none', outline: 'none', width: '100%' }}
            />
            <hr style={{ width: '100%', border: `1px solid ${theme.main}` }} />
            <span style={{ color: theme.main, fontSize: '2rem' }}>
              문제의 링크를 올려 풀이의 제목을 완성해보세요
            </span>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ResponsiveImage src={`/images/${platform}-symbol.png`} />
            <h1>{title}</h1>
            <h1
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setTitle('');
                setPlatform('');
              }}
            >
              ✖️
            </h1>
          </div>
        )}
      </div>
      <TextField label="한 줄 요약" placeholder="풀이를 간단하게 요약해보세요." />
      <TextField label="언어" placeholder="C++, C, ..., " onChange={onChange} />
      <TextField label="풀이" />
      <div>
        {/* <div style={{ float: 'right' }}> */}
        <Button />
        {/* </div> */}
      </div>
    </Template>
  );
}
