import MarkdownPreview from '@uiw/react-markdown-preview';
import TextField from '../common/TextField';
import styled from 'styled-components';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RiImage2Fill, RiPencilFill, RiEyeFill } from 'react-icons/ri';
import ThemeContext from '../contexts/ThemeContext';
import useDebounce from '../hooks/useDebounce';
import TextArea from '../common/TextArea';

const StyledPreviewWrapper = styled.div`
  ${(props) => props.styleWithWidth};
  width: var(--wrapper-width, 100%);
  border: 1.5px solid white;
  border-radius: var(--wrapper-border-radius, 5px);
  font-size: inherit;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  min-height: 50rem;
`;

const StyledPreview = styled(MarkdownPreview)`
  font-size: inherit;
  width: 100%;
  ${(props) => props.styleWithWidth};
  margin: var(--textarea-margin, 2%);
  resize: none;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: 0px;
`;

export default function Solution({ content, setContent }) {
  const theme = useContext(ThemeContext);
  const selectBoxRef = useRef(null);
  const [toggle, setToggle] = useState(0);
  const debounce = useDebounce();

  // 짧은 텀으로 toggle할 경우 throttle or debounce 적용

  const onClick = () => {
    if (!toggle) {
      selectBoxRef.current.style.transform = 'translateY(-4rem)';
    } else {
      selectBoxRef.current.style.transform = 'translateY(0)';
    }
    setToggle(!toggle);
  };

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
      <div style={{ position: 'sticky', top: '7rem' }}>
        <div style={{ position: 'absolute', left: '-5rem', top: '4rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              width: '4rem',
              height: '8rem',
              cursor: 'pointer',
              boxShadow: `0 0 3px 1px white`
            }}
            onClick={onClick}
          >
            <div
              ref={selectBoxRef}
              style={{
                position: 'absolute',
                backgroundColor: theme.main,
                transition: '1s',
                width: '4rem',
                height: '4rem',
                top: '4rem'
              }}
            />
            <div
              style={{
                width: '4rem',
                height: '4rem',
                fontSize: '1.5em',
                textAlign: 'center'
              }}
            >
              ✏️
            </div>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                fontSize: '1.5em',
                textAlign: 'center'
              }}
            >
              👁
            </div>
          </div>
          <div
            style={{
              margin: '10px 0',
              cursor: 'pointer',
              borderRadius: '15px'
            }}
          >
            {' '}
            <div
              style={{
                width: '4rem',
                height: '4rem',
                fontSize: '1.5em',
                textAlign: 'center',
                boxShadow: `0 0 3px 1px white`,
                opacity: toggle ? 0.5 : 1
              }}
              onClick={() => {
                if (toggle) return;
                // 이미지 load
              }}
            >
              {/* file input과 연결 */}
              🏞
            </div>
          </div>
        </div>
      </div>
      {!toggle ? (
        <TextArea
          name="content"
          label="풀이"
          rows={20}
          placeholder="풀이 방식을 공유해주세요"
          value={content}
          onChange={onChange}
          fullWidth
        />
      ) : (
        <div style={{ fontSize: 'inherit' }}>
          <span style={{ opacity: 0.7 }}>{`프리뷰입니다 ᵔࡇᵔ`}</span>
          <StyledPreviewWrapper>
            <StyledPreview source={content} />
          </StyledPreviewWrapper>
        </div>
      )}
    </div>
  );
}
