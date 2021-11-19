import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';
import { fetchSolution_POST } from '../form/fetchApis';
import useToken from '../hooks/useToken';

export default function WritePost() {
  const theme = useContext(ThemeContext);
  const [setMessage] = useContext(ModalContext);
  const [isLoggedIn] = useContext(UserContext);
  const [post, setPost] = useState({
    title: '',
    platform: '',
    subtitle: '',
    language: '',
    content: ''
  });
  const getValidToken = useToken();

  const onClick = () => {
    // 데이터 유효성 검사
    (async () => {
      const accessToken = await getValidToken();
      const res = await fetchSolution_POST(post, accessToken);
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
      {isLoggedIn ? (
        <Form post={post} setPost={setPost} Button={WriteButton} />
      ) : (
        '접근할 수 없는 권한입니다!!!'
      )}
    </Template>
  );
}
