import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';
import { fetchSolution_POST } from '../form/fetchApis';
import useToken from '../hooks/useToken';
import { useHistory } from 'react-router';

export default function WritePost() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [setMessage] = useContext(ModalContext);
  const [isLoggedIn] = useContext(UserContext);
  const [post, setPost] = useState({
    title: '',
    subtitle: '',
    language: '',
    content: ''
  });
  const [_, requestService] = useToken();
  const [isFetching, setIsFetching] = useState(false);

  const onClick = () => {
    // 데이터 유효성 검사
    (async () => {
      setIsFetching(true);

      const res = await requestService(() => fetchSolution_POST({ ...post }));
      const json = await res.json();
      setIsFetching(false);

      if (res.status === 201) {
        history.replace(`/post?id=${json.post._id}`);
        return;
      }
      setMessage(`${json.msg} ${res.status === 201 ? ' ^ࡇ^ ' : ' ㅠࡇㅠ '}`);
    })();
  };

  const WriteButton = () => (
    <Button label="작성" color={theme.main} size="small" onClick={onClick} disabled={isFetching} />
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
