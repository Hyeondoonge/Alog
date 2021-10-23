import Logo from '../common/Logo';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useGetPost from '../hooks/useGetPost';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { fetchLanguages } from '../post/fetchApis';
import Loading from '../common/Loading';
import PostList from '../post/PostList';
import FilterList from '../post/FilterList';
import SearchBar from '../post/SearchBar';
import Template from '../Template';

export default function Home() {
  // 함수에 다수의 파라미터를 사용하지 않고 object하나를 사용해서 파라미터 순서 신경X, 전달할 값이 없어 null을 전달을 할 필요가 없어짐
  const size = 3;
  const debounce = useDebounce();
  const [posts, totalCount, isLoading, updatePost] = useGetPost();
  const [keyword, setKeyword] = useState('');
  const [languages, setLanguages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const postListRef = useRef(null);
  const wrapperRef = useRef(null);
  const filterRef = useRef(null);
  const [createObserver, registerTargets] = useIntersectionObserver();

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
    debounce(() => {
      const newKeyword = event.target.value;
      setKeyword(newKeyword);
      updatePost({
        keyword: newKeyword,
        languages: languages.filter((e, index) => isSelected[index]).map(({ name }) => name),
        size
      });
    }, 550);
  };

  const handleChangeLanguage = (index) => () => {
    const newIsSelected = [...isSelected];
    newIsSelected[index] = !isSelected[index] ? true : false;
    const selectedLanguages = languages
      .filter((e, index) => newIsSelected[index])
      .map(({ name }) => name);

    window.localStorage.setItem('filter_languages', selectedLanguages);

    setIsSelected(newIsSelected);

    updatePost({
      keyword,
      languages: selectedLanguages,
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
      const localFilterLanguages = window.localStorage.getItem('filter_languages');

      setIsSelected(
        localFilterLanguages
          ? fetchedLanguages.map(({ name }) => localFilterLanguages.includes(name))
          : new Array(fetchedLanguages.length).fill(false)
      );
    })();
  }, []);

  useEffect(() => {
    if (totalCount <= posts.length) return;
    const postItems = postListRef.current.children;
    const targetElement = postItems[postItems.length - 1];

    createObserver(handleIntersect);
    registerTargets([targetElement]);
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
        <div style={{ fontSize: '6rem' }}>
          <Logo />
        </div>
        <SearchBar
          placeholder="찾고자하는 문제의 제목을 입력하세요."
          handleChange={handleChangeKeyword}
          handleRemove={handleRemoveKeyword}
          handleFocus={handleFocusBar}
          value={keyword}
          endorment={
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleRemoveKeyword();
              }}
            >
              ✖️
            </span>
          }
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
