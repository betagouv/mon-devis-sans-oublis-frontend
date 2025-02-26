'use client';

import { useState, useEffect } from 'react';

export const useIsDesktop = (breakpoint = 768) => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isDesktop;
};
