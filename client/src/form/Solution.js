import MarkdownPreview from '@uiw/react-markdown-preview';
import styled from 'styled-components';
import { useContext, useRef, useState } from 'react';
import TextArea from '../common/TextArea';
import ThemeContext from '../contexts/ThemeContext';
import { RiPencilFill, RiEye2Line, RiImage2Fill } from 'react-icons/ri';

const StyledPreviewWrapper = styled.div`
  ${(props) => props.styleWithWidth};
  width: var(--wrapper-width, 100%);
  font-size: inherit;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  box-shadow: 0px 3px 3px 3px black;
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
`;

export default function Solution({ content, setContent }) {
  const theme = useContext(ThemeContext);
  const selectBoxRef = useRef(null);
  const [toggle, setToggle] = useState(0);

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
              cursor: 'pointer'
            }}
            onClick={onClick}
          >
            <div
              ref={selectBoxRef}
              style={{
                position: 'absolute',
                backgroundColor: 'black',
                opacity: 0.7,
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
              <RiPencilFill />
            </div>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                fontSize: '1.5em',
                textAlign: 'center'
              }}
            >
              <RiEye2Line />
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
                opacity: toggle ? 0.5 : 1
              }}
              onClick={() => {
                if (toggle) return;
                // 이미지 load
              }}
            >
              {/* file input과 연결 */}
              <RiImage2Fill />
            </div>
          </div>
        </div>
      </div>
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
        <span style={{ opacity: 0.7 }}>{`프리뷰입니다 ᵔࡇᵔ`}</span>
        <StyledPreviewWrapper backgroundColor={theme.background}>
          <StyledPreview source={content} />
          {/* 아무 언어 지정하지 않았을때 내부 코드 color 희게 보임. */}
        </StyledPreviewWrapper>
      </div>
    </div>
  );
}
