import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { searchPost } from './fetchApis';
import Filter from './Filter';
import TextField from '../common/TextField';
import List from '../common/List';

// 백엔드로 빼기
const languages = [
  'C++',
  'java',
  'C',
  'Node.js',
  'MySQL',
  'javascript',
  'Oracle',
  'Python',
  'Python2',
  'Python3',
  'C#',
  'Swift'
];

const usePostHook = (keyword) => {
  const [posts, setPosts] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(new Array(languages.length).fill(0));

  return [posts, selectedFilter, setSelectedFilter];
};

export default function Search() {
  // 필터 토글 시 포스트도 변경되야함, hooks따로 만들기
  const textRef = useRef(null);
  const [posts, setPosts] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(new Array(languages.length).fill(0));

  const handleChange = (event) => {
    if (textRef) textRef.current.innerHTML = `you're typing...`;
  };

  const handleKeyUp = async (event) => {
    const keyword = event.target.value;
    textRef.current.innerHTML = `search ${keyword}`;
    const res = await searchPost(keyword);
    setPosts(res?.posts);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center'
      }}
    >
      <TextField
        size={35}
        placeholder="찾고자하는 문제의 제목을 입력하세요."
        handleChange={handleChange}
        handleKeyUp={debounce(handleKeyUp, 500)}
      />
      <span ref={textRef}>.</span>
      <div>
        <List elements={languages} state={selectedFilter} updateState={setSelectedFilter} />
      </div>
      {posts?.length ? `검색 결과 ${posts.length}개의 풀이` : '검색 결과가 없습니다.'}
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
