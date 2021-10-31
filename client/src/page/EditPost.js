import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../common/Button';
import Form from '../common/Form';
import Template from '../Template';
import { fetchSolution_GET, fetchSolution_PUT } from '../form/fetchApis';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import ModalContext from '../contexts/ModalContext';

export default function EditPost() {
  const { id } = queryString.parse(useLocation().search);
  const theme = useContext(ThemeContext);
  const [setMessage] = useContext(ModalContext);
  const [post, setPost] = useState({
    id: '',
    title: '',
    platform: '',
    subtitle: '',
    language: '',
    content: '',
    writerId: ''
  });
  // post 자주 바뀌지 않는 상태인데, 한 번 받고 말 상태,, useState말고 다른 방법이 없나 생각했으나
  // 수정이 일어나면 post상태도 변경되구나 ~

  useEffect(() => {
    (async () => {
      const post = await fetchSolution_GET(id);
      console.log(post);
      setPost(post);
    })();
  }, []); // 필드 초기값 설정

  const onClick = () => {
    (async () => {
      const res = await fetchSolution_PUT(id, post);
      if (res.msg) setMessage(res.msg);
    })();
  };

  const EditButton = () => (
    <Button label="작성" size="small" color={theme.main} onClick={onClick} />
  );

  return (
    <>
      <Button label="작성" size="small" color={theme.main} onClick={onClick} />
      <Template>
        <Form post={post} setPost={setPost} Button={EditButton} />
      </Template>
    </>
  );
}
