import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../common/Button';
import Form from '../common/Form';
import Template from '../Template';

export default function EditPost() {
  const theme = useContext(ThemeContext);
  const [post, setPost] = useState(null);
  // post 자주 바뀌지 않는 상태인데, 한 번 받고 말 상태,, useState말고 다른 방법이 없나 생각했으나
  // 수정이 일어나면 post상태도 변경되구나 ~

  useEffect(() => {}, []); // 필드 초기값 설정

  const editButton = () => <Button label="수정" color={theme.main} />;

  return (
    <Template>
      <Form post={post} setPost={setPost} Button={editButton} />
    </Template>
  );
}
