import { useState, useEffect } from 'react';

type Breakpoint = 'XS' | 'SM' | 'MD' | 'LG' | 'XL';

const breakpoints = {
  XS: 575,
  SM: 767,
  MD: 991,
  LG: 1247,
  XL: 1248,
};

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('XL');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width <= breakpoints.XS) {
        setBreakpoint('XS');
      } else if (width <= breakpoints.SM) {
        setBreakpoint('SM');
      } else if (width <= breakpoints.MD) {
        setBreakpoint('MD');
      } else if (width <= breakpoints.LG) {
        setBreakpoint('LG');
      } else {
        setBreakpoint('XL');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}
