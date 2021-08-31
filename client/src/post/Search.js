import { useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { searchPost } from './fetchApis';
import TextField from '../common/TextField';
import List from '../common/List';
import Post from './Post';
import ThemeContext from '../contexts/ThemeContext';
import Loading from '../common/Loading';

// 백엔드로 빼기
const languages = [
  'C++',
  'java',
  'C',
  'MySQL',
  'javascript',
  'Oracle',
  'Python',
  'Python2',
  'Python3',
  'C#',
  'Swift'
];

const PostList = ({ filteredPosts }) =>
  filteredPosts.map(({ _id: id, ...post }) => <Post key={id} post={post} />);

const usePostHook = () => {
  const [isLoading, setIsLoading] = useState(0);
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({
    'C++': false,
    java: false,
    C: false,
    MySQL: false,
    javascript: false,
    Oracle: false,
    Python: false,
    Python2: false,
    Python3: false,
    'C#': false,
    Swift: false
  });

  const fetchPosts = async (keyword) => {
    setIsLoading(1);

    if (!keyword) {
      setPosts([]);
    } else {
      const res = await searchPost(keyword);
      setPosts(res?.posts ?? []);
    }
    setIsLoading(0);
  };

  useEffect(() => {
    fetchPosts(keyword);
  }, [keyword]);

  return [isLoading, posts, keyword, setKeyword, selectedFilter, setSelectedFilter];
};

export default function Search() {
  // 필터 토글 시 포스트도 변경되야함, hooks따로 만들기
  const [isLoading, posts, keyword, setKeyword, selectedFilter, setSelectedFilter] = usePostHook();
  let filteredPosts = [];

  if (languages.some((language) => selectedFilter[language] === true)) {
    filteredPosts = posts.filter(({ language }) => selectedFilter[language] === true);
  } else {
    filteredPosts = posts;
  }
  const theme = useContext(ThemeContext);

  const handleKeyUp = async (event) => {
    // 왜 async..?
    const keyword = event.target.value;
    setKeyword(keyword);
  };

  const handleClickRemove = () => {
    setKeyword(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'center'
      }}
    >
      <TextField
        size={50}
        placeholder="찾고자하는 문제의 제목을 입력하세요."
        handleKeyUp={debounce(handleKeyUp, 500)}
        handleClickRemove={handleClickRemove}
      />
      <div>
        <List elements={languages} states={selectedFilter} updateStates={setSelectedFilter} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {keyword && (
            <span style={{ fontSize: '1.5rem' }}>
              {filteredPosts?.length
                ? `검색 결과 ${filteredPosts.length}개의 풀이`
                : '검색 결과가 없습니다.'}
            </span>
          )}
          {filteredPosts && <PostList filteredPosts={filteredPosts} />}
        </>
      )}
    </div>
  );
}
