import MarkdownPreview from '@uiw/react-markdown-preview';
import TextField from '../common/TextField';
import styled from 'styled-components';
import { useCallback, useContext, useRef, useState } from 'react';
import { RiPencilFill, RiEyeFill } from 'react-icons/ri';
import ThemeContext from '../contexts/ThemeContext';

const StyledPreviewWrapper = styled.div`
  ${(props) => props.styleWithWidth};
  width: var(--wrapper-width, 100%);
  border: 1.5px solid white;
  border-radius: var(--wrapper-border-radius, 5px);
  font-size: inherit;
  display: flex;
  flex-direction: row;
  margin: 1% 0;
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

  // 짧은 텀으로 toggle할 경우 throttle or debounce 적용

  const onClick = () => {
    if (!toggle) {
      selectBoxRef.current.style.transform = 'translateY(4rem)';
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
      <div style={{ position: 'absolute', left: '-5rem', top: '4rem', background: 'grey' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <div
            ref={selectBoxRef}
            style={{
              position: 'absolute',
              backgroundColor: theme.main,
              width: '4rem',
              height: '4rem',
              transition: '1s'
            }}
          />
          <RiPencilFill
            size="4rem"
            onClick={onClick}
            style={{ zIndex: 1, backgroundColor: '#11ffee00' }}
          />
          <RiEyeFill
            size="4rem"
            onClick={onClick}
            style={{ zIndex: 1, backgroundColor: '#11ffee00' }}
          />
        </div>
      </div>
      {!toggle ? (
        <div>
          <TextField
            name="content"
            label="풀이"
            rows={20}
            placeholder="풀이 방식을 공유해주세요"
            value={content}
            onChange={onChange}
            fullWidth
          />
        </div>
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
