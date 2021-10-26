import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../common/Button';
import Form from '../common/Form';
import Template from '../Template';
import StickyHeader from '../common/StickyHeader';
import { fetchSolution_GET, fetchSolution_PUT } from '../form/fetchApis';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export default function EditPost() {
  const { id } = queryString.parse(useLocation().search);
  const theme = useContext(ThemeContext);
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
      console.log(res);
    })();
  };

  return (
    <>
      <StickyHeader>
        <div style={{ textAlign: 'right' }}>
          <Button label="작성" size="small" color={theme.main} onClick={onClick} />
        </div>
      </StickyHeader>
      <Template>
        <Form post={post} setPost={setPost} />
      </Template>
    </>
  );
}
