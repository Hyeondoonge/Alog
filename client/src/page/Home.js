import Logo from '../common/Logo';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useGetPost from '../hooks/useGetPost';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { fetchLanguages_GET } from '../post/fetchApis';
import Loading from '../common/Loading';
import PostList from '../post/PostList';
import FilterList from '../post/FilterList';
import SearchBar from '../post/SearchBar';
import Template from '../Template';
import { RiCloseFill } from 'react-icons/ri';

export default function Home() {
  // 함수에 다수의 파라미터를 사용하지 않고 object하나를 사용해서 파라미터 순서 신경X, 전달할 값이 없어 null을 전달을 할 필요가 없어짐
  const size = 3;
  const debounce = useDebounce();
  const [posts, totalCount, leftCount, isLoading, updatePost] = useGetPost();
  const [keyword, setKeyword] = useState('');
  const [languages, setLanguages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const postListRef = useRef(null);
  const wrapperRef = useRef(null);
  const filterRef = useRef(null);
  const logoRef = useRef(null);
  const [createObserver, registerTargets] = useIntersectionObserver();
  const [value, setValue] = useState('');
  const txt = '원하는 문제의 풀이를 찾거나 알고리즘을 기록해보세요! ᵔࡇᵔ';
  var i = 0;

  const handleIntersect = async () => {
    if (leftCount === 0) return;
    updatePost({
      keyword,
      languages: languages.filter((e, index) => isSelected[index]).map(({ name }) => name),
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

  // 언어 변경 시 post 리셋.
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
    logoRef.current.style.fontSize = '70px';
  };

  const typeWriter = () => {
    if (i <= txt.length) {
      setValue(txt.substring(0, i));
      i++;
      setTimeout(typeWriter, 50);
    }
  };

  useEffect(() => {
    typeWriter();
  }, []);

  useEffect(() => {
    (async () => {
      const { languages: fetchedLanguages } = await fetchLanguages_GET();
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
    if (posts.length === 0) return;
    const postItems = postListRef.current.children;
    const targetElement = postItems[postItems.length - 1];

    createObserver(handleIntersect);
    registerTargets([targetElement]);
  }, [posts]);

  return (
    <Template header>
      <div
        ref={wrapperRef}
        style={{
          transform: 'translateY(30%)',
          transition: '1s',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div
          style={{ textAlign: 'center', margin: '50px', height: '100px', wordBreak: 'keep-all' }}
        >
          <div ref={logoRef} style={{ fontSize: '80px', transition: '1s' }}>
            <Logo />
          </div>
          <i style={{ fontSize: '20px', color: '#9bc9b1', margin: 10 }}>{value}</i>
        </div>
        <SearchBar
          placeholder="찾는 풀이의 문제제목을 입력하세요."
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
              <RiCloseFill />
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
