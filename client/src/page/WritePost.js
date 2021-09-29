import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';

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
    console.log('fetch...');
    console.log(post);
  };

  const writeButton = () => (
    <Button label="등록" color={theme.main} size="medium" onClick={onClick} />
  );
  return (
    <Template>
      <Form post={post} setPost={setPost} Button={writeButton} />
    </Template>
  );
}
