import { render, screen } from '@testing-library/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Matomo from './Matomo';

// Define the type for the Matomo push arguments
interface MatomoPushArgs {
  'mtm.startTime'?: number;
  event: string;
  PageTitle?: string;
  PageUrl?: string;
  PageOrigin?: string;
}

declare global {
  interface Window {
    _mtm?: MatomoPushArgs[]; // Specify that _mtm is an array of MatomoPushArgs
  }
}

// Mock the usePathname and useSearchParams hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Matomo Component', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
    delete window._mtm; // Clean up the global _mtm variable
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
    });
  });

  it('should not render in non-production environment', () => {
    // Mock NODE_ENV to development
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
    });

    // Render the Matomo component
    const { container } = render(<Matomo />);

    // Check that the component returns null
    expect(container.firstChild).toBeNull();
  });

  it('should render MatomoContent and track page views in production', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
    });

    // Mock the pathname and search params
    (usePathname as jest.Mock).mockReturnValue('/test-page');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    // Spy on the global _mtm array
    const pushSpy = jest.fn();
    window._mtm = []; // Initialize as array
    window._mtm.push = pushSpy; // Add push method

    // Render the Matomo component
    render(<Matomo />);

    // Check if the MatomoContent is rendered
    expect(screen.queryByText(/loading/i)).toBeNull(); // Assuming no fallback is shown

    // Check if the page view is tracked
    expect(pushSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'mtm.PageView',
        PageUrl: window.location.href,
      })
    );
  });

  it('should warn if NEXT_PUBLIC_MATOMO_URL is not defined', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
    });

    // Mock the pathname and search params
    (usePathname as jest.Mock).mockReturnValue('/test-page');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    // Spy on console.warn
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    // Render the Matomo component without NEXT_PUBLIC_MATOMO_URL
    render(<Matomo />);

    // Check that a warning is logged
    expect(warnSpy).toHaveBeenCalledWith(
      'NEXT_PUBLIC_MATOMO_URL is not defined'
    );

    // Restore the console.warn implementation
    warnSpy.mockRestore();
  });

  it('should initialize Matomo script in production with valid URL', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
    });
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com/script.js';

    // Mock document methods
    const mockScript = document.createElement('script');
    const mockParentNode = { insertBefore: jest.fn() };
    jest.spyOn(document, 'createElement').mockReturnValue(mockScript);
    jest.spyOn(document, 'getElementsByTagName').mockReturnValue({
      0: { parentNode: mockParentNode } as unknown as HTMLScriptElement,
      length: 1,
      item: (index: number) =>
        index === 0
          ? ({ parentNode: mockParentNode } as unknown as HTMLScriptElement)
          : null,
      namedItem: () => null,
    } as unknown as HTMLCollectionOf<Element>);

    // Mock the pathname and search params
    (usePathname as jest.Mock).mockReturnValue('/test-page');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    // Render the Matomo component
    render(<Matomo />);

    // Check if script was created with correct properties
    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(mockScript.async).toBe(true);
    expect(mockScript.src).toBe('https://matomo.example.com/script.js');
    expect(mockParentNode.insertBefore).toHaveBeenCalledWith(
      mockScript,
      expect.any(Object)
    );

    // Check if mtm.Start event was pushed
    expect(window._mtm?.[0]).toEqual(
      expect.objectContaining({
        event: 'mtm.Start',
      })
    );
  });
});
