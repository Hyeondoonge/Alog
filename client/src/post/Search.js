import { useContext, useEffect, useRef, useState } from 'react';
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
  filteredPosts.map(({ _id: id, ...post }) => <Post key={id} post={{ id, ...post }} />);

const usePostHook = () => {
  const [isLoading, setIsLoading] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [intersecting, setIntersecting] = useState(0);
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
  const size = 10; // 10개씩 fetch

  const fetchPostsByKeyword = async (keyword) => {
    setIsLoading(1);

    if (!keyword) {
      setTotalCount(0);
      setPosts([]);
      setIsLoading(0);
    } else {
      const res = await searchPost(keyword, size);
      setTotalCount(res?.totalCount ?? 0);
      setPosts([...(res?.posts ?? [])]);
      setIsLoading(0);
    }
  };

  const fetchPostsByCursor = async () => {
    setIsLoading(1);

    if (!keyword) {
      setTotalCount(0);
      setPosts([]);
      setIsLoading(0);
    } else {
      const { length } = posts;
      const cursor = posts[length - 1]._id; // 맨 마지막 요소의 아이디 = 커서

      const res = await searchPost(keyword, size, cursor);

      setTotalCount(res?.totalCount ?? 0);
      setPosts([...posts, ...(res?.posts ?? [])]);
      setIsLoading(0);
    }
    setIntersecting(0);
  };

  useEffect(() => {
    fetchPostsByKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    // 조건문 달아주지 않으면, intersecting이 0일 때도 요청이 일어난다.
    if (intersecting) fetchPostsByCursor();
  }, [intersecting]);

  return [
    isLoading,
    posts,
    totalCount,
    keyword,
    setKeyword,
    selectedFilter,
    setSelectedFilter,
    setIntersecting
  ];
};

export default function Search() {
  // 필터 토글 시 포스트도 변경되야함, hooks따로 만들기
  const [
    isLoading,
    posts,
    totalCount,
    keyword,
    setKeyword,
    selectedFilter,
    setSelectedFilter,
    setIntersecting
  ] = usePostHook();

  const postRef = useRef(null);
  const observer = useRef(null);

  let filteredPosts = [];

  if (languages.some((language) => selectedFilter[language])) {
    filteredPosts = posts.filter(({ language }) => selectedFilter[language]);
  } else {
    filteredPosts = posts;
  }

  const theme = useContext(ThemeContext);

  const handleKeyUp = async (event) => {
    setKeyword(event.target.value);
  };

  const handleClickRemove = () => {
    setKeyword(null);
  };

  useEffect(() => {
    const { length } = posts;

    if (!length) return;
    if (totalCount === length) return;

    const target = postRef.current.children[length - 3];

    if (observer.current != null) observer.current.disconnect(); // 새로운 옵저버 생성 전 정리
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersecting(1); // 교차했으니 커서 변경이벤트 발생
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1
      }
    );
    observer.current.observe(target);

    return () => {
      if (observer.current != null) observer.current.disconnect();
    };
  }, [posts]);

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
      <List elements={languages} states={selectedFilter} updateStates={setSelectedFilter} />
      {keyword && (
        <span style={{ fontSize: '2rem' }}>
          {totalCount ? `검색 결과 ${totalCount}개의 풀이` : '검색 결과가 없습니다.'}
        </span>
      )}
      <div ref={postRef} style={{ display: 'flex', flexDirection: 'column', gap: 'inherit' }}>
        {filteredPosts && <PostList filteredPosts={filteredPosts} />}
      </div>
      {isLoading !== 0 && <Loading />}
    </div>
  );
}
