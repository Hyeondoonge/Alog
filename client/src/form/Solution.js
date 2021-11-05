import { useContext, useRef, useState } from 'react';
import TextArea from '../common/TextArea';
import ThemeContext from '../contexts/ThemeContext';
import { MarkDownPreview } from '../common/MarkDownPreview';

export default function Solution({ content, setContent, toggle }) {
  const theme = useContext(ThemeContext);

  // 짧은 텀으로 toggle할 경우 throttle or debounce 적용

  const onChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div
      style={{
        fontSize: '2rem',
        position: 'relative'
      }}
    >
      <div style={{ fontSize: 'inherit', display: `${!toggle ? 'block' : 'none'}` }}>
        <TextArea
          name="content"
          label="풀이"
          rows={20}
          placeholder="풀이 방식을 공유해주세요"
          value={content}
          onChange={onChange}
          fullWidth
        />
      </div>
      <div style={{ fontSize: 'inherit', display: `${toggle ? 'block' : 'none'}` }}>
        <div style={{ height: '4rem' }}>
          <span style={{ opacity: 0.7 }}>{`프리뷰입니다 ᵔࡇᵔ`}</span>
        </div>
        <MarkDownPreview source={content} />
      </div>
    </div>
  );
}
