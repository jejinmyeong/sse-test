import React, { useState, useEffect } from 'react';

interface IsAtBottomHandler {
  offset: number;
  ref: React.RefObject<HTMLDivElement>;
}

export const useAtBottom = ({ offset = 0, ref }: IsAtBottomHandler) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      setIsAtBottom(ref.current.scrollHeight <= ref.current?.scrollTop + ref.current?.offsetHeight);
    };

    ref.current?.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isAtBottom;
};
