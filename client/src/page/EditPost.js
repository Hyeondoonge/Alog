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

  useEffect(() => {
    (async () => {
      const post = await fetchSolution_GET(id);
      setPost(post);
    })();
  }, []); // 필드 초기값 설정

  const onClick = () => {
    // 데이터 유효성 검사
    (async () => {
      const res = await fetchSolution_PUT(id, post);
      const json = await res.json();
      if (json.msg) {
        setMessage(`${json.msg} ${res.status === 201 ? ' ^ࡇ^ ' : ' ㅠࡇㅠ '}`);
      }
      // 작성글 바로 볼  수 있게 라우팅
    })();
  };

  const EditButton = () => (
    <Button label="작성" size="small" color={theme.main} onClick={onClick} />
  );

  return (
    <>
      <Template>
        <Form post={post} setPost={setPost} WriteButton={EditButton} />
      </Template>
    </>
  );
}
