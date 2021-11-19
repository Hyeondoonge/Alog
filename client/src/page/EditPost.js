import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../common/Button';
import Form from '../common/Form';
import Template from '../Template';
import { fetchSolution_GET, fetchSolution_PUT } from '../form/fetchApis';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import ModalContext from '../contexts/ModalContext';
import UserContext from '../contexts/UserContext';
import useToken from '../hooks/useToken';

export default function EditPost() {
  const { id } = queryString.parse(useLocation().search);
  const theme = useContext(ThemeContext);
  const [isLoggedIn, _, userData] = useContext(UserContext);
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
  const [error, setError] = useState(null);
  const getValidToken = useToken();

  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      const post = await fetchSolution_GET(id);
      // 게시물 id에 따라 error page 렌더링
      if (userData.userId !== post.writerId) {
        setError('접근할 수 없는 권한입니다!'); // redirect
        return;
      }
      setPost(post);
    })();
  }, [userData, isLoggedIn]); // 필드 초기값 설정

  const onClick = () => {
    // 데이터 유효성 검사
    (async () => {
      const accessToken = await getValidToken();
      const res = await fetchSolution_PUT(id, post, accessToken);
      const json = await res.json();
      if (res.status === 201) {
        window.location.href = `/post?id=${id}`;
        return;
      }
      setMessage(`${json.msg} ${res.status === 201 ? ' ^ࡇ^ ' : ' ㅠࡇㅠ '}`);
      // 작성글 바로 볼  수 있게 라우팅
    })();
  };

  const EditButton = () => (
    <Button label="작성" size="small" color={theme.main} onClick={onClick} />
  );

  if (!id) return <Template>잘못된 접근입니다!!</Template>;

  if (error) return <Template>{error}</Template>;

  return (
    <>
      <Template>
        {isLoggedIn ? (
          <Form post={post} setPost={setPost} Button={EditButton} />
        ) : (
          '서비스를 이용하려면 alog 서비스에 가입해주세요!'
        )}
      </Template>
    </>
  );
}
