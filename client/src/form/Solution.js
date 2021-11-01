import MarkdownPreview from '@uiw/react-markdown-preview';
import styled from 'styled-components';
import { useContext, useRef, useState } from 'react';
import TextArea from '../common/TextArea';
import ThemeContext from '../contexts/ThemeContext';

const StyledPreviewWrapper = styled.div`
  font-size: inherit;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  box-shadow: 0px 2px 3px 3px black;
`;

const StyledPreview = styled(MarkdownPreview)`
  font-size: 2rem;
  width: 100%;
  ${(props) => props.styleWithWidth};
  padding: var(--textarea-margin, 2%);
  resize: none;
  border: 0px;
  min-height: 50rem;

  & code {
    color: black;
  }

  & blockquote {
    color: #d0d0d0;
  }

  & h1,
  h2,
  h3 {
    border-bottom: none;
  }
`;

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
        <StyledPreviewWrapper backgroundColor={theme.background}>
          <StyledPreview source={content} />
        </StyledPreviewWrapper>
      </div>
    </div>
  );
}
