import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';
import { fetchSolution_POST } from '../form/fetchApis';

export default function WritePost() {
  const theme = useContext(ThemeContext);
  const [setMessage] = useContext(ModalContext);
  const [_, ___, userData] = useContext(UserContext);

  const [post, setPost] = useState({
    title: '',
    platform: '',
    subtitle: '',
    language: '',
    content: ''
  });

  const onClick = () => {
    // 데이터 유효성 검사
    (async () => {
      const res = await fetchSolution_POST(post, userData.userId);
      const json = await res.json();
      if (res.status === 201) {
        window.location.href = `/post?id=${json.post._id}`;
        return;
      }
      setMessage(`${json.msg} ${res.status === 201 ? ' ^ࡇ^ ' : ' ㅠࡇㅠ '}`);
    })();
  };

  const WriteButton = () => (
    <Button label="작성" color={theme.main} size="small" onClick={onClick} />
  );

  return (
    <Template>
      <Form post={post} setPost={setPost} WriteButton={WriteButton} />
    </Template>
  );
}
