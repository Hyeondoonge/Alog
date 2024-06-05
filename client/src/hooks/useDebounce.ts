import { useEffect, useRef } from 'react';

export default function useDebounce() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (callback: () => void, time: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback();
      timer.current = null;
    }, time);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  });

  return debounce;
}
