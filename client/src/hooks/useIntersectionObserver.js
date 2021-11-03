import { useEffect, useRef, useState } from 'react';

// hook을 재사용할 수 있게 빼내고 메인 컴포넌트로 부터 observer관련 처리 로직을 빼내어
// 컴포넌트와 옵저버에 일을 분담
// 컴포넌트에서는 처리 함수와, 타켓을 전달하면 됨.

export default function useIntersectionObserver() {
  const observerRef = useRef(null);
  const targets = useRef([]);

  const unobserve = () => {
    targets.current.forEach((target) => {
      observerRef.current.unobserve(target);
    });
  };

  const createObserver = (callback) => {
    if (observerRef.current) {
      unobserve();
      targets.current = [];
    }
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1.0
      }
    );
  };

  const registerTargets = (targetElements) => {
    if (observerRef.current) {
      targets.current = targetElements;
      targetElements.forEach((target) => {
        observerRef.current.observe(target);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) unobserve();
    };
  }, []);

  // disconnect 해야하는 시점 -> 1. 새로운 post가 렌더링됐을 때, observer 등록 전, 2. observer를 사용하는 컴포넌트가 제거됐을 때
  // 1, 2번은 메인 컴포넌트에서 알 수 있는 건데? 거기서 observer의 함수를 호출하도록 해야하나?
  // 1번은 옵저버 생성전 모든 연결된 것들을 끊어내도록 구현 2번은 현재 hook에서 useEffect 정리함수를 써서 해결할 수 있다.

  // 옵저버에서 할 수 있는 일이라면 최대한 얘네가 하도록, 메인 컴포넌트에 하는 처리해야하는 일을 줄이는 것이 목적.
  // + 확실한 옵저버 뒷처리 가능!

  return [createObserver, registerTargets];
}
