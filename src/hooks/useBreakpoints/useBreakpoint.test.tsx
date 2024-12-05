import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { useBreakpoint } from './useBreakpoint';

describe('useBreakpoint', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    // Restore the original innerWidth after each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  const resizeWindow = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: width,
    });
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
  };

  it('should return XS for width <= 575px', () => {
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      resizeWindow(575);
    });
    expect(result.current).toBe('XS');
  });

  it('should return SM for width <= 767px', () => {
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      resizeWindow(767);
    });
    expect(result.current).toBe('SM');
  });

  it('should return MD for width <= 991px', () => {
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      resizeWindow(991);
    });
    expect(result.current).toBe('MD');
  });

  it('should return LG for width <= 1247px', () => {
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      resizeWindow(1247);
    });
    expect(result.current).toBe('LG');
  });

  it('should return XL for width > 1247px', () => {
    const { result } = renderHook(() => useBreakpoint());
    act(() => {
      resizeWindow(1248);
    });
    expect(result.current).toBe('XL');
  });

  it('should update breakpoint when window is resized', () => {
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      resizeWindow(1300);
    });
    expect(result.current).toBe('XL');

    act(() => {
      resizeWindow(900);
    });
    expect(result.current).toBe('MD');

    act(() => {
      resizeWindow(500);
    });
    expect(result.current).toBe('XS');
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useBreakpoint());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
});
