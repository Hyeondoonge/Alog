import Template from '../Template';
import TextField from './TextField';
import { URLField } from './URLField';

const ResponsiveImage = ({ src }) => (
  <div>
    <img src={src} width="100%" height="100%" />
  </div>
);

export default function Form({ post, setPost, Button }) {
  const { title, platform, subtitle, language, content } = post;

  const onChangeSubtitle = (event) => {};
  const onChangeLanguage = (event) => {};
  const onChangeContent = (event) => {};

  return (
    <>
      <div style={{ height: 50 }}>
        {!title ? (
          <URLField
            setStates={(title, platform) => {
              setPost({ ...post, title, platform });
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
        name="sumsubtitlemary"
        label="한 줄 요약"
        placeholder="풀이를 간단하게 요약해보세요"
        fullWidth
      />
      <TextField name="language" label="언어" placeholder="ex) C++" />
      <TextField
        name="content"
        label="풀이"
        rows={20}
        placeholder="풀이 방식을 공유해주세요"
        value={content}
        fullWidth
      />
      <div style={{ textAlign: 'right' }}>
        <Button />
      </div>
    </>
  );
}
