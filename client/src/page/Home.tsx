import { useEffect, useRef } from 'react';
import Template from '../Template';
import { RiGhost2Fill } from 'react-icons/ri';
import styled, { keyframes } from 'styled-components';
import SearchField from 'common/SearchField';
import SearchPostList from 'post/SearchPostList';
import FilterList from '../post/FilterList';
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    return () => {
      mount.current = false;
    };
  }, []);

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
            <Ghost />
          </i>
        </div>
        <SearchField />
        <FilterList />
        <SearchPostList />
      </div>
    </Template>
  );
}
