import { useEffect, useRef, useState } from 'react';
import TextField from './TextField';
import { URLField } from '../form/URLField';
import LanguageField from '../form/LanguageField';
import Solution from '../form/Solution';

const ResponsiveImage = ({ src }) => (
  <div>
    <img src={src} />
  </div>
);

export default function Form({ post, setPost, Button }) {
  const { title, platform, subtitle, language, content } = post;

  const onChangeSubtitle = (event) => {};

  // 기존 TextField의 onBlur 이벤트가 정의되어있는데,
  // 추가로 클라이언트가 정의하려는 경우에 어떻게 처리하는 것이 좋을까?

  // 1. 이벤트를 추가로 받게하도록 textfield를 속성을 조정한다 => 유연하지 않은 변경, 기능 추가를 위해 textfield코드가 변경되야함
  // 2. 이벤트 버블링을 이용해 TextField를 감싸는 div에서 onBlur를 핸들링하도록한다.

  const onChangeContent = (event) => {};

  return (
    <>
      <div style={{ height: 50 }}>
        {!(title && platform) ? (
          <URLField
            setPlatformAndTitle={(platform, title) => {
              setPost({ ...post, platform, title });
            }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ResponsiveImage src={`/images/${platform}-symbol.png`} />
            <h1>{title}</h1>
            <h1
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setPost({ ...post, title: '', platform: '' });
              }}
            >
              ✖️
            </h1>
          </div>
        )}
      </div>
      <TextField
        name="subtitle"
        label="한 줄 요약"
        placeholder="풀이를 간단하게 요약해보세요"
        onChange={(event) => {
          console.log(event.target.value);
        }}
        fullWidth
      />
      <LanguageField
        language={language}
        setLanguage={(language) => {
          setPost({ ...post, language });
        }}
      />
      <Solution
        content={content}
        setContent={(content) => {
          setPost({ ...post, content });
        }}
      />
      <div style={{ textAlign: 'right' }}>
        <Button />
      </div>
    </>
  );
}
