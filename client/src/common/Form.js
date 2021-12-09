import { useContext, useMemo, useRef, useState } from 'react';
import TextField from './TextField';
import { URLField } from '../form/URLField';
import LanguageField from '../form/LanguageField';
import Solution from '../form/Solution';
import { RiCloseFill } from 'react-icons/ri';
import { RiPencilFill, RiEye2Line, RiImage2Fill } from 'react-icons/ri';
import Footer from './Footer';
import ThemeContext from '../contexts/ThemeContext';
import MediaQuery from 'react-responsive';

// toggler 중복되는 영역 묶고,
// media query 사용 코드도 다시 보기

// 개선된 점이 있다면 기록하기 !!

const Toggler = ({ toggle, onClick }) => {
  const theme = useContext(ThemeContext);
  const icons = (
    <>
      <div
        style={{
          width: 30,
          height: 30,
          fontSize: 30,
          padding: 5,
          color: toggle ? 'white' : theme.main,
          textAlign: 'center'
        }}
      >
        <RiPencilFill />
      </div>
      <div
        style={{
          width: 30,
          height: 30,
          fontSize: 30,
          padding: 5,
          textAlign: 'center',
          color: toggle ? theme.main : 'white'
        }}
      >
        <RiEye2Line />
      </div>
    </>
  );
  return (
    <>
      <MediaQuery minWidth={780}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: 40,
            height: 75,
            cursor: 'pointer',
            gap: 5
          }}
          onClick={onClick}
        >
          {icons}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={0} maxWidth={750}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={onClick}
        >
          {icons}
        </div>
      </MediaQuery>
    </>
  );
};

const ResponsiveImage = ({ src }) => (
  <div style={{ width: '2rem', justifyContent: 'center', display: 'flex' }}>
    <img src={src} width={20} />
  </div>
);

export default function Form({ post, postTitle, setPost, setPostTitle, Button }) {
  const { subtitle, language, content } = post;
  const { title, platform } = postTitle;
  const [toggle, setToggle] = useState(0);

  const onClick = () => {
    setToggle(!toggle);
  };

  // 기존 TextField의 onBlur 이벤트가 정의되어있는데,
  // 추가로 클라이언트가 정의하려는 경우에 어떻게 처리하는 것이 좋을까?

  // 1. 이벤트를 추가로 받게하도록 textfield를 속성을 조정한다 => 유연하지 않은 변경, 기능 추가를 위해 textfield코드가 변경되야함
  // 2. 이벤트 버블링을 이용해 TextField를 감싸는 div에서 onBlur를 핸들링하도록한다.

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      <div style={{ height: 50, fontSize: '1rem' }}>
        {!(title && platform) ? (
          <URLField
            setPostTitle={(platform, title) => {
              setPostTitle({ platform, title });
            }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ResponsiveImage src={`/images/${platform}-symbol.png`} />
            <h1>{title}</h1>
            <h1
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setPostTitle({ platform: '', title: '' });
              }}
            >
              <RiCloseFill size="3rem" />
            </h1>
          </div>
        )}
      </div>
      <TextField
        name="subtitle"
        label="한 줄 요약"
        placeholder=""
        value={subtitle}
        onChange={(event) => {
          setPost({ ...post, subtitle: event.target.value });
        }}
        fullWidth
      />
      <LanguageField
        language={language}
        setLanguage={(language) => {
          setPost({ ...post, language });
        }}
      />
      <MediaQuery minWidth={780}>
        <div style={{ position: 'sticky', top: 0 }}>
          <div style={{ position: 'absolute', left: -50, top: 60 }}>
            <Toggler toggle={toggle} onClick={onClick} />
            {/* <div
              style={{
                margin: '20px 0',
                cursor: 'pointer',
                borderRadius: '15px'
              }}
            >
              {' '}
              <div
                style={{
                  width: 30,
                  height: 30,
                  fontSize: 30,
                  padding: 5,
                  textAlign: 'center',
                  opacity: toggle ? 0.5 : 1
                }}
                onClick={() => {
                  if (toggle) return;
                  // 이미지 load
                }}
              >
                <RiImage2Fill />
              </div>
            </div> */}
          </div>
        </div>
      </MediaQuery>
      <Solution
        content={content}
        setContent={(content) => {
          setPost({ ...post, content });
        }}
        toggle={toggle}
      />
      <MediaQuery minWidth={780}>
        <div style={{ textAlign: 'right' }}>
          <Button />
        </div>
      </MediaQuery>
      <MediaQuery minWidth={0} maxWidth={750}>
        <div>
          <Footer>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5
              }}
            >
              <Toggler toggle={toggle} onClick={onClick} />
              <Button />
            </div>
          </Footer>
        </div>
      </MediaQuery>
    </div>
  );
}
