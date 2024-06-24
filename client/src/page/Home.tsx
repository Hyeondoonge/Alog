import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useGetPost from '../hooks/useGetPost';
import { fetchLanguages_GET } from '../post/fetchApis';
import PostList from '../post/PostList';
import FilterList from '../post/FilterList';
import Template from '../Template';
import { RiGhost2Fill } from 'react-icons/ri';
import Skeleton from '../common/Skeleton';
import List from '../common/List';
import styled, { keyframes } from 'styled-components';
import SearchField from 'common/SearchField';
import { useHistory, useLocation } from 'react-router-dom';
import { Language } from 'types/api';
import { getFilteredLangauges, saveFilteredLangauges } from 'storage/LocalStorage';
import { LanguageStorage } from 'storage/SessionStorage';

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

function isStringArray(param: any): param is string[] {
  return Array.isArray(param) && param.every((value) => typeof value === 'string');
}

export default function Home() {
  // 함수에 다수의 파라미터를 사용하지 않고 object하나를 사용해서 파라미터 순서 신경X, 전달할 값이 없어 null을 전달을 할 필요가 없어짐
  const size = 50;
  const debounce = useDebounce();
  const {
    data: { posts, leftCount, totalCount },
    isLoading,
    updatePost,
    initPost,
    initPostWithQuery
  } = useGetPost();
  const [keyword, setKeyword] = useState('');
  const [languages, setLanguages] = useState<Language[]>(LanguageStorage.get() || []);
  const [isSelected, setIsSelected] = useState<boolean[]>(() => {
    if (languages.length === 0) {
      return [];
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const filterParam: null | string[] | unknown = JSON.parse(
      decodeURIComponent(urlSearchParams.get('filter') || 'null')
    );

    let filteredLanguages: string[] = [];

    if (!filterParam) {
      filteredLanguages = getFilteredLangauges();
    } else if (isStringArray(filterParam)) {
      filteredLanguages = filterParam;
    }

    if (filteredLanguages.length === 0) {
      return new Array(languages.length).fill(false);
    }
    return languages.map(({ name }) => filteredLanguages.includes(name));
  });

  const [isLanguageLoading, setIsLanguageLoading] = useState(false);

  const handleIntersect = () => {
    if (leftCount === 0) return;
    updatePost({
      keyword,
      languages: languages.filter((_, index) => isSelected[index]).map(({ name }) => name),
      size,
      cursor: posts[posts.length - 1]._id
    });
  };

  const history = useHistory();

  const handleChangeKeyword = async (event: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);

    debounce(() => {
      const selectedLanguages = languages
        .filter((_, index) => isSelected[index])
        .map(({ name }) => name);

      // stack history
      const newSearchParam = new URLSearchParams();

      if (newKeyword) {
        newSearchParam.append('keyword', newKeyword);
      }
      newSearchParam.append('filter', encodeURIComponent(JSON.stringify(selectedLanguages)));

      history.push(`/?${newSearchParam.toString()}`);

      initPost();
      updatePost({
        keyword: newKeyword,
        languages: languages.filter((_, index) => isSelected[index]).map(({ name }) => name),
        size
      });
    }, 550);
  };

  // 언어 변경 시 post 리셋.
  const handleChangeLanguage = (index: number) => () => {
    const newIsSelected = [...isSelected];
    newIsSelected[index] = !isSelected[index] ? true : false;
    const selectedLanguages = languages
      .filter((_, index) => newIsSelected[index])
      .map(({ name }) => name);

    saveFilteredLangauges(selectedLanguages);
    setIsSelected(newIsSelected);

    const newSearchParam = new URLSearchParams();
    if (keyword) {
      newSearchParam.append('keyword', keyword);
    }
    newSearchParam.append('filter', encodeURIComponent(JSON.stringify(selectedLanguages)));
    history.push(`/?${newSearchParam.toString()}`);
    // stack history
    if (keyword) {
      initPost();
      updatePost({
        keyword,
        languages: selectedLanguages,
        size
      });
    }
  };

  useEffect(() => {
    let languagesData: Language[] = [];

    async function initLanguage() {
      setIsLanguageLoading(true);

      const data = await fetchLanguages_GET();

      if (!data) {
        // TODO: 안전한 에러 핸들링 추가
        return;
      }

      const { languages: fetchedLanguages } = data;

      setLanguages(fetchedLanguages);
      setIsLanguageLoading(false);

      languagesData = fetchedLanguages;

      LanguageStorage.set('languages', languagesData);
    }

    // 첫 로딩, pop state
    function initOption() {
      function isStringArray(param: any): param is string[] {
        return Array.isArray(param) && param.every((value) => typeof value === 'string');
      }
      try {
        // isSelected 상태 초기화 로직 => 중복 제거하기!
        if (window.location.pathname !== '/') {
          return;
        }
        const urlSearchParams = new URLSearchParams(window.location.search);
        const filterParam: null | string[] | unknown = JSON.parse(
          decodeURIComponent(urlSearchParams.get('filter') || 'null')
        );

        let filteredLanguages: string[] = [];

        if (!filterParam) {
          filteredLanguages = getFilteredLangauges();
        } else if (isStringArray(filterParam)) {
          filteredLanguages = filterParam;
        }

        if (filteredLanguages.length === 0) {
          setIsSelected(new Array(languagesData.length).fill(false));
        } else {
          setIsSelected(languagesData.map(({ name }) => filteredLanguages.includes(name)));
        }

        if (!filterParam) {
          urlSearchParams.append('filter', encodeURIComponent(JSON.stringify(filteredLanguages)));
          history.replace(`/?${urlSearchParams.toString()}`);
        }
        setKeyword(urlSearchParams.get('keyword') || '');
      } catch (error) {
        console.log(error);
      }
    }

    function init() {
      initOption();
      initPostWithQuery();
    }

    (async () => {
      if (!LanguageStorage.get()) {
        await initLanguage();
      } else {
        languagesData = languages;
      }
      init();
    })();

    window.addEventListener('popstate', init);
    return () => {
      window.removeEventListener('popstate', init);
    };
  }, []);

  const location = useLocation();
  const mount = useRef(false);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
      return;
    }
    if (location.search !== '') {
      return;
    }
    window.location.reload();
  }, [location]);

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
        <SearchField
          placeholder="찾는 풀이의 문제제목을 입력해보세요."
          value={keyword}
          handleChange={handleChangeKeyword}
        />
        <div>
          {isLanguageLoading ? (
            <List>
              {new Array(8).fill(null).map((_, index) => (
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
              states={isSelected}
              handleClick={handleChangeLanguage}
            />
          )}
        </div>
        {keyword && (!isLoading || posts.length !== 0) && (
          <span style={{ fontSize: '2rem' }}>
            {totalCount ? `검색 결과 ${totalCount}개의 풀이` : '검색 결과가 없습니다.'}
          </span>
        )}
        {isLoading && !posts.length && (
          <Skeleton
            Component={<div style={{ width: '20rem', height: '5rem', borderRadius: '2rem' }} />}
          />
        )}
        <PostList posts={posts} handleIntersect={handleIntersect} isLoading={isLoading} />
      </div>
    </Template>
  );
}
