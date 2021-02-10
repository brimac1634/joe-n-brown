import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState<number[]>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const usePrevious = <S>(value: any): S | undefined => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}