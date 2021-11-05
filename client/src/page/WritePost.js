import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';
import { fetchSolution_POST } from '../form/fetchApis';
import ModalContext from '../contexts/ModalContext';

export default function WritePost() {
  const theme = useContext(ThemeContext);
  const [setMessage] = useContext(ModalContext);
  const [post, setPost] = useState({
    title: '',
    platform: '',
    subtitle: '',
    language: '',
    content: '',
    writerId: 'jsi06138'
  });

  const onClick = () => {
    // 데이터 유효성 검사
    (async () => {
      const res = await fetchSolution_POST(post);
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
