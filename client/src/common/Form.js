import { useContext, useRef, useState } from 'react';
import TextField from './TextField';
import { URLField } from '../form/URLField';
import LanguageField from '../form/LanguageField';
import Solution from '../form/Solution';
import { RiCloseFill } from 'react-icons/ri';
import { RiPencilFill, RiEye2Line, RiImage2Fill } from 'react-icons/ri';
import Footer from './Footer';
import ThemeContext from '../contexts/ThemeContext';
import MediaQuery from 'react-responsive';

const ResponsiveImage = ({ src }) => (
  <div style={{ width: '2rem', justifyContent: 'center', display: 'flex' }}>
    <img src={src} width={20} />
  </div>
);

export default function Form({ post, setPost, WriteButton }) {
  const { title, platform, subtitle, language, content } = post;
  const [toggle, setToggle] = useState(0);
  const togglerRef = useRef(null);
  const theme = useContext(ThemeContext);

  const onClick = () => {
    if (!toggle) {
      togglerRef.current.children[1].style.color = theme.main;
      togglerRef.current.children[0].style.color = 'unset';
    } else {
      togglerRef.current.children[0].style.color = theme.main;
      togglerRef.current.children[1].style.color = 'unset';
    }
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
            <div
              ref={togglerRef}
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
              <div
                style={{
                  width: 30,
                  height: 30,
                  fontSize: 30,
                  padding: 5,
                  color: theme.main,
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
                  textAlign: 'center'
                }}
              >
                <RiEye2Line />
              </div>
            </div>
            <div
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
                {/* file input과 연결 */}
                <RiImage2Fill />
              </div>
            </div>
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
          <WriteButton />
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={onClick}
                ref={togglerRef}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    fontSize: 30,
                    padding: 5,
                    textAlign: 'center',
                    color: theme.main
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
                    textAlign: 'center'
                  }}
                >
                  <RiEye2Line />
                </div>
              </div>
              <WriteButton />
            </div>
          </Footer>
        </div>
      </MediaQuery>
    </div>
  );
}
