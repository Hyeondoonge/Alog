import Logo from '../common/Logo';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { fetchLanguages, fetchPosts } from '../post/fetchApis';
import Loading from '../common/Loading';
import PostList from '../post/PostList';
import FilterList from '../post/FilterList';
import SearchBar from '../post/SearchBar';
import Template from '../Template';

// fetch post를 호출 이벤트가 3개
// 비슷하고 중복되는 로직 -> useGetPost를 만들어 로직을 묶고, 여기서 서버로부터 전달받는 상태들을 관리
// => 서버에서 전달받은 데이터와, 클라이언트에서 만이 설정가능한 상태들을 따로 관리하면 쉽다.
// 서버 데이터들 (상태)를 사용자 hook으로 전달받아 컴포넌트에서 사용하면 된다.

const useGetPost = () => {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updatePost = async (option) => {
    // queryObject는 Home에서 전달
    if (!option.keyword) {
      setTotalCount(0);
      setPosts([]);
      return;
    }

    setIsLoading(true);
    const res = await fetchPosts(option);
    setTotalCount(res.totalCount);

    if (!option.cursor) setPosts(res.posts);
    else setPosts([...posts, ...res.posts]);
    setIsLoading(false);
  };

  return [posts, totalCount, isLoading, updatePost];
};

export default function Home() {
  // 함수에 다수의 파라미터를 사용하지 않고 object하나를 사용해서 파라미터 순서 신경X, 전달할 값이 없어 null을 전달을 할 필요가 없어짐
  const size = 7;
  const [posts, totalCount, isLoading, updatePost] = useGetPost();
  const [keyword, setKeyword] = useState('');
  const [languages, setLanguages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const postListRef = useRef(null);
  const observerRef = useRef(null);
  // wrapperRef, filterRef
  const wrapperRef = useRef(null);
  const filterRef = useRef(null);

  const handleIntersect = async () => {
    updatePost({
      keyword,
      language: languages.filter((e, index) => isSelected[index]).map(({ name }) => name),
      size,
      cursor: posts[posts.length - 1]._id
    });
  };

  const handleRemoveKeyword = () => {
    setKeyword('');
    updatePost({ keyword: '', size });
  };

  const handleChangeKeyword = async (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    updatePost({
      keyword: newKeyword,
      languages: languages.filter((e, index) => isSelected[index]).map(({ name }) => name),
      size
    });
  };

  const handleChangeLanguage = (index) => () => {
    const newIsSelected = [...isSelected];
    newIsSelected[index] = !isSelected[index];

    setIsSelected(newIsSelected);

    updatePost({
      keyword,
      languages: languages.filter((e, index) => newIsSelected[index]).map(({ name }) => name),
      size
    });
  };

  const handleFocusBar = () => {
    wrapperRef.current.style.transform = 'translateY(0%)';
    filterRef.current.style.opacity = '1';
  };

  useEffect(() => {
    (async () => {
      const { languages: fetchedLanguages } = await fetchLanguages();
      setLanguages(fetchedLanguages);
      setIsSelected(new Array(fetchedLanguages.length).fill(0));
    })();
  }, []);

  useEffect(() => {
    if (totalCount <= posts.length) return;

    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleIntersect();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1.0
      }
    );
    const postItems = postListRef.current.children;
    const targetElement = postItems[postItems.length - 1];

    observerRef.current.observe(targetElement);

    return () => {
      observerRef.current.disconnect();
    };
  }, [posts]);

  return (
    <Template>
      <div
        ref={wrapperRef}
        style={{
          transform: 'translateY(30%)',
          transition: '1s',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <Logo />
        <SearchBar
          placeholder="찾고자하는 문제의 제목을 입력하세요."
          handleChange={debounce(handleChangeKeyword, 550)}
          handleRemove={handleRemoveKeyword}
          handleFocus={handleFocusBar}
        />
        <div ref={filterRef} style={{ transition: '1s', opacity: 0 }}>
          <FilterList elements={languages} state={isSelected} handleClick={handleChangeLanguage} />
        </div>
        {keyword && (
          <span style={{ fontSize: '2rem' }}>
            {totalCount ? `검색 결과 ${totalCount}개의 풀이` : '검색 결과가 없습니다.'}
          </span>
        )}
        <PostList postListRef={postListRef} posts={posts} />
        {isLoading && <Loading />}
      </div>
    </Template>
  );
}
