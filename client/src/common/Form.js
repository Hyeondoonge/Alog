import { useContext, useState } from 'react';
import TextField from './TextField';
import LanguageField from '../form/LanguageField';
import Solution from '../form/Solution';
import { RiPencilFill, RiEye2Line } from 'react-icons/ri';
import Footer from './Footer';
import ThemeContext from '../contexts/ThemeContext';
import MediaQuery from 'react-responsive';

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

export default function Form({ post, setPost, Button }) {
  const { title, subtitle, language, content } = post;

  const [toggle, setToggle] = useState(0);

  const onClick = () => {
    setToggle(!toggle);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      <TextField
        name="subtitle"
        label="제목"
        placeholder="플랫폼, 문제의 제목을 작성해보세요"
        value={title}
        onChange={(event) => {
          setPost({ ...post, title: event.target.value });
        }}
        fullWidth
      />
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
