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
import { RiGhost2Fill } from 'react-icons/ri';
import Skeleton from '../common/Skeleton';
import List from '../common/List';
import styled, { keyframes } from 'styled-components';

const ghost_animation = keyframes`
  0% {
    transform: translateX(10px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 100;
  }
`;

const Ghost = styled(RiGhost2Fill)`
  animation: 4s ${ghost_animation};
`;

export default function Home() {
  // 함수에 다수의 파라미터를 사용하지 않고 object하나를 사용해서 파라미터 순서 신경X, 전달할 값이 없어 null을 전달을 할 필요가 없어짐
  const size = 3;
  const debounce = useDebounce();
  const [posts, totalCount, leftCount, isLoading, updatePost] = useGetPost();
  const [keyword, setKeyword] = useState('');
  const [languages, setLanguages] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const postListRef = useRef(null);
  const [createObserver, registerTargets] = useIntersectionObserver();
  const [isLanguageLoading, setIsLanguageLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const { languages: fetchedLanguages } = await fetchLanguages_GET();
      setLanguages(fetchedLanguages);
      let localFilterLanguages = window.localStorage.getItem('filter_languages');
      if (!localFilterLanguages) {
        setIsSelected(new Array(fetchedLanguages.length).fill(false));
      } else {
        localFilterLanguages = localFilterLanguages.split(',');
        setIsSelected(fetchedLanguages.map(({ name }) => localFilterLanguages.includes(name)));
      }
      setIsLanguageLoading(false);
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
        className="target"
        style={{
          transition: '1s',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ textAlign: 'center', margin: '30px', height: '20px', wordBreak: 'keep-all' }}>
          <i style={{ fontSize: '20px', color: '#9bc9b1' }}>
            원하는 문제의 풀이를 찾거나 알고리즘을 기록해보세요&nbsp;
            {/* <RiGhost2Fill /> */}
            <Ghost />
          </i>
        </div>
        <SearchBar
          placeholder="찾는 풀이의 문제제목을 입력해보세요."
          handleChange={handleChangeKeyword}
          handleRemove={handleRemoveKeyword}
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
        <div>
          {isLanguageLoading ? (
            <List>
              {new Array(8).fill(null).map((e, index) => (
                <Skeleton
                  key={index}
                  Component={
                    <div style={{ width: '10rem', height: '4rem', borderRadius: '2rem' }} />
                  }
                />
              ))}
            </List>
          ) : (
            <FilterList
              elements={languages}
              state={isSelected}
              handleClick={handleChangeLanguage}
            />
          )}
        </div>
        {keyword && !isLoading && (
          <span style={{ fontSize: '2rem' }}>
            {totalCount ? `검색 결과 ${totalCount}개의 풀이` : '검색 결과가 없습니다.'}
          </span>
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
