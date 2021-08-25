import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { searchPost } from './fetchApis';
import Filter from './Filter';

// 백엔드로 빼기
const languages = ['C++', 'java', 'C', 'Node.js', 'MySQL'];
console.log(Date.now());
export default function Search() {
  // 필터 토글 시 포스트도 변경되야함, hooks따로 만들기
  const textRef = useRef(null);
  const [posts, setPosts] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(new Array(languages.length).fill(0));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <input
        size={25}
        type="search"
        placeholder="검색어를 입력하세요."
        onChange={(event) => {
          if (textRef) textRef.current.innerHTML = `you're typing...`;
        }}
        onKeyUp={debounce(async (event) => {
          const keyword = event.target.value;
          textRef.current.innerHTML = `search ${keyword}`;
          const res = await searchPost(keyword);
          setPosts(res?.posts);
        }, 500)}
      />
      <span ref={textRef}>.</span>
      <div>
        <Filter elements={languages} state={selectedFilter} updateState={setSelectedFilter} />
      </div>
      {posts?.length && `검색 결과 ${posts.length}개의 풀이`}
      {posts && (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
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
