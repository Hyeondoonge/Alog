import { useContext, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Form from '../common/Form';
import Button from '../common/Button';
import Template from '../Template';
import StickyHeader from '../common/StickyHeader';
import { fetchSolution_POST } from '../form/fetchApis';

export default function WritePost() {
  const theme = useContext(ThemeContext);
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
      alert(res.msg);
      console.log(res);
      // 작성글 바로 볼  수 있게 라우팅
    })();
  };

  return (
    <>
      <StickyHeader>
        <div style={{ textAlign: 'right' }}>
          <Button label="작성" color={theme.main} size="small" onClick={onClick} />
        </div>
      </StickyHeader>
      <Template>
        <Form post={post} setPost={setPost} />
      </Template>
    </>
  );
}
