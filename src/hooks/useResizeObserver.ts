import React, { useState, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { VirtuosoHandle } from 'react-virtuoso';

interface ResizeObserverHandler<T> {
  ref: React.RefObject<T>;
  callback: () => void;
  isResize: boolean;
}

export const useResizeObserver = <T>({ ref, callback, isResize }: ResizeObserverHandler<T>) => {
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries) || !isResize) {
        console.log('test');
        return;
      }

      const entry = entries[0];
      const { height, top } = entry.contentRect;

      console.log(height, top);
      setHeight(() => height);
      setTop(() => top);

      callback();
    },
    [callback, isResize],
  );

  const observer = useMemo(() => new ResizeObserver(handleResize), [handleResize]);

  useEffect(() => {
    if (isResize) {
      console.log('등록됨2!');
      observer.observe(ref.current as Element);
      console.log(observer);
    } else {
      console.log('해제됨2');
      observer.unobserve(ref.current as Element);
      console.log(observer);
    }
  }, [observer, isResize]);

  useLayoutEffect(() => {
    // if (!ref.current) {
    //   return;
    // }
    // if (isResize) {
    //   console.log('등록됨!');
    //   observer.observe(ref.current as HTMLElement);
    // }
    return () => {
      console.log('해제됨');
      observer.disconnect();
    };
  }, [observer, ref]);

  return { height, top };
};
