import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './useMobile';
import { vi } from 'vitest';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  let listeners: { [key: string]: (e: any) => void } = {};
  let mqlMock: any;

  beforeEach(() => {
    listeners = {};
    mqlMock = {
      addEventListener: (event: string, cb: any) => { listeners[event] = cb; },
      removeEventListener: (event: string) => { delete listeners[event]; }
    };
    window.matchMedia = vi.fn().mockImplementation(() => mqlMock);
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    vi.resetAllMocks && vi.resetAllMocks();
  });

  it('returns true if window.innerWidth < 768', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    act(() => {
      listeners.change && listeners.change({});
    });
    expect(result.current).toBe(true);
  });

  it('returns false if window.innerWidth >= 768', () => {
    window.innerWidth = 900;
    const { result } = renderHook(() => useIsMobile());
    act(() => {
      listeners.change && listeners.change({});
    });
    expect(result.current).toBe(false);
  });
});
