import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';
import StickyHeader from '../common/StickyHeader';

export default function WritePost() {
  const theme = useContext(ThemeContext);
  const [post, setPost] = useState({
    title: '',
    platform: '',
    subtitle: '',
    language: '',
    content: ''
  });

  const onClick = () => {
    // 데이터 유효성 검사
    console.log('fetch...');
    console.log(post);
  };

  return (
    <>
      <StickyHeader>
        <div style={{ textAlign: 'right' }}>
          <Button label="작성" color={theme.main} size="small" onClick={onClick} />
        </div>
      </StickyHeader>
      <Template>
        <Form post={post} setPost={setPost} />
      </Template>
    </>
  );
}
