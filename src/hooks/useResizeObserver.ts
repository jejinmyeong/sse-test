import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { VirtuosoHandle } from 'react-virtuoso';

interface ResizeObserverHandler<T> {
  ref: React.RefObject<T>;
  callback: () => void;
  isResize: boolean;
}

export const useResizeObserver = <T>({ ref, callback, isResize }: ResizeObserverHandler<T>) => {
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);

  const observer = new ResizeObserver((entries) => handleResize(entries));

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries) || !isResize) {
        return;
      }
      const entry = entries[0];
      const { height, top } = entry.contentRect;

      console.log(height, top);
      setHeight(() => height);
      setTop(() => top);

      // if (callback) {
      //   callback(entry);
      // }
    },
    [callback, isResize],
  );

  useEffect(() => {
    if (isResize) observer.observe(ref.current as Element);
    else observer.unobserve(ref.current as HTMLElement);
  }, [isResize]);

  useLayoutEffect(() => {
    // if (!ref.current) {
    //   return;
    // }
    if (isResize) observer.observe(ref.current as HTMLElement);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { height, top };
};
