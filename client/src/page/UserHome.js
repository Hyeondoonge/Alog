import { useContext, useEffect, useRef, useState } from 'react';
import { fetchUserInfo_GET } from '../api/userApi';
import UserContext from '../contexts/UserContext';
import useGetPost from '../hooks/useGetPost';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import PostList from '../post/PostList';
import Template from '../Template';

export default function UserHome({ match }) {
  const { ownerId } = match.params;
  const [createObserver, registerTargets] = useIntersectionObserver();
  const [posts, totalCount, leftCount, isLoading, updatePost] = useGetPost();
  const postListRef = useRef(null);
  const [description, setDescription] = useState('');
  const [_, __, userData] = useContext(UserContext);

  const size = 3;

  const handleIntersect = async () => {
    if (leftCount === 0) return;
    updatePost({
      size,
      cursor: posts[posts.length - 1]._id,
      writerId: ownerId
    });
  };

  useEffect(() => {
    (async () => {
      // 유효한 사용자 페이지라고 가정, 무효한 사용자라면 404 렌더링
      const { _, description } = await fetchUserInfo_GET(ownerId, userData?.userId ?? '');
      console.log(description);
      setDescription(description);
      updatePost({ size, writerId: ownerId });
    })();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;
    const postItems = postListRef.current.children;
    const targetElement = postItems[postItems.length - 1];

    createObserver(handleIntersect);
    registerTargets([targetElement]);
  }, [posts]);

  return (
    <Template header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          fontSize: '3rem'
        }}
      >
        <div style={{ margin: '80px 0' }}>
          🌞 <strong>{ownerId}</strong> {description}
        </div>
        <div style={{ width: '100%', backgroundColor: 'grey', height: '1px' }}></div>
        <PostList postListRef={postListRef} posts={posts} />
      </div>
    </Template>
  );
}
