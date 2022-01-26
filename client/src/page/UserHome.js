import { useContext, useEffect, useRef, useState } from 'react';
import { fetchUserInfo_GET } from '../api/userApi';
import ProfileImage from '../common/ProfileImage';
import Skeleton from '../common/Skeleton';
import ThemeContext from '../contexts/ThemeContext';
import UserContext from '../contexts/UserContext';
import useGetPost from '../hooks/useGetPost';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import PostList from '../post/PostList';
import Template from '../Template';

const ProfileSkeleton = ({ ownerId }) => (
  <>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Skeleton
        Component={<div style={{ width: '10rem', height: '10rem', borderRadius: '50%' }} />}
      />
      <strong>{ownerId}</strong>
    </div>
    <Skeleton Component={<div style={{ width: '40rem', height: '4.5rem' }} />} />
  </>
);

export default function UserHome(props) {
  const { ownerId } = props.match.params;
  const [createObserver, registerTargets] = useIntersectionObserver();
  const [posts, totalCount, leftCount, isLoading, updatePost] = useGetPost();
  const postListRef = useRef(null);
  const [ownerData, setOwnerData] = useState('');
  const { description, profilePath } = ownerData;
  const [_, __, userData] = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

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
      const { _, description, profilePath } = await fetchUserInfo_GET(ownerId);
      setOwnerData({ description, profilePath });
      updatePost({ size, writerId: ownerId });
      setLoading(false);
    })();
  }, [props]);

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
          gap: 20,
          fontSize: '3rem',
          margin: '50px 0'
        }}
      >
        <div
          style={{
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            gap: 20,
            fontSize: '3.5rem',
            width: '100%'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'column' }}>
            {loading ? (
              <ProfileSkeleton ownerId={ownerId} />
            ) : (
              <>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <ProfileImage size="10rem" filename={profilePath} />
                  <strong>{ownerId}</strong>
                </div>
                <div style={{ width: '100%', wordWrap: 'break-word' }}>{description}</div>
              </>
            )}
          </div>
        </div>
        <div style={{ width: '100%', backgroundColor: 'grey', height: '1px' }}></div>
        {posts.length === 0 && !isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200
            }}
          >
            작성된 솔루션이 없어요.
          </div>
        )}
        <PostList postListRef={postListRef} posts={posts} />
        {isLoading && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 50 }}>
            {new Array(3).fill(null).map((e, index) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '75%' }}
                >
                  <Skeleton
                    Component={
                      <div style={{ width: '40%', height: '5rem', borderRadius: '2rem' }} />
                    }
                  />
                  <Skeleton
                    Component={
                      <div style={{ width: '60%', height: '5rem', borderRadius: '2rem' }} />
                    }
                  />
                </div>
                <div style={{ width: '15%' }}>
                  <Skeleton Component={<div style={{ height: '10rem', borderRadius: '2rem' }} />} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Template>
  );
}
