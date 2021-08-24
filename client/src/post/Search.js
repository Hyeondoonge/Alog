import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { searchPost } from './fetchApis';

export default function Search() {
  const textRef = useRef(null);
  const [posts, setPosts] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div
        style={{
          backgroundColor: '#5F939A',
          color: 'white',
          height: 'fit-content',
          padding: '2em',
          boxShadow: '0 0 5px 2px #eee',
          textAlign: 'center'
        }}
      >
        ALOG
      </div>
      <input
        size={25}
        onChange={(event) => {
          if (textRef) textRef.current.innerHTML = `you're typing...`;
        }}
        onKeyUp={debounce(async (event) => {
          const keyword = event.target.value;
          textRef.current.innerHTML = `search ${keyword}`;
          const res = await searchPost(keyword);
          setPosts(res.posts);
        }, 500)}
      />
      <button>검색</button>
      <span ref={textRef}>.</span>
      {posts && (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              제목 {post.title}
              작성자 {post.writerId}
              작성일 {post.writeDate}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
