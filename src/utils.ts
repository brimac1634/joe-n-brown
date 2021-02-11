import { useState, useEffect, useRef, useLayoutEffect } from 'react';

interface Screen {
  width: number,
  height: number
}

export const useWindowSize = (): Screen => {
  /**
   * Custom hook to return the change in viewport size
   * returns array of numbers
   * [screen width, screen height]
   */
  const [size, setSize] = useState<Screen>({ width: 0, height: 0});
  useLayoutEffect(() => {
    function updateSize() {
      setSize({width: window.innerWidth, height: window.innerHeight});
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