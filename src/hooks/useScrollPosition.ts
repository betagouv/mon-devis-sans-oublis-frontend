'use client';

import { useState, useEffect } from 'react';

// scroll 88%
export const useScrollPosition = (threshold = 0.95) => {
  const [isButtonSticky, setIsButtonSticky] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      const stickyThreshold = scrollHeight * threshold;

      setIsButtonSticky(scrollPosition < stickyThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isButtonSticky;
};
