import { useContext, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { searchPost } from './fetchApis';
import TextField from '../common/TextField';
import List from '../common/List';
import Post from './Post';
import ThemeContext from '../contexts/ThemeContext';

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

const usePostHook = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({
    'C++': false,
    java: false,
    C: false,
    'Node.js': false,
    MySQL: false,
    javascript: false,
    Oracle: false,
    Python: false,
    Python2: false,
    Python3: false,
    'C#': false,
    Swift: false
  });

  useEffect(async () => {
    // use async closure?
    const res = await searchPost(keyword);
    const newPosts = res?.posts ?? [];
    setPosts(newPosts);
  }, [keyword]);

  return [posts, setKeyword, selectedFilter, setSelectedFilter];
};

export default function Search() {
  // 필터 토글 시 포스트도 변경되야함, hooks따로 만들기
  const textRef = useRef(null);
  const [posts, setKeyword, selectedFilter, setSelectedFilter] = usePostHook();
  let filteredPosts = [];

  if (languages.some((language) => selectedFilter[language] === true)) {
    filteredPosts = posts.filter(({ language }) => selectedFilter[language] === true);
  } else {
    filteredPosts = posts;
  }
  const theme = useContext(ThemeContext);

  const handleChange = (event) => {
    if (textRef) textRef.current.innerHTML = `you're typing...`;
  };

  const handleKeyUp = async (event) => {
    const keyword = event.target.value;
    textRef.current.innerHTML = `search ${keyword}`;
    setKeyword(keyword);
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
        size={50}
        placeholder="찾고자하는 문제의 제목을 입력하세요."
        handleChange={handleChange}
        handleKeyUp={debounce(handleKeyUp, 500)}
      />
      <span ref={textRef}>.</span>
      <div>
        <List elements={languages} states={selectedFilter} updateStates={setSelectedFilter} />
      </div>
      <span style={{ fontSize: '1rem' }}>
        {filteredPosts?.length
          ? `검색 결과 ${filteredPosts.length}개의 풀이`
          : '검색 결과가 없습니다.'}
      </span>
      {filteredPosts && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}
        >
          {filteredPosts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
