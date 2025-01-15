import { usePathname, useSearchParams } from 'next/navigation';
import { init, push } from '@socialgouv/matomo-next';
import { render } from '@testing-library/react';

import Matomo from './Matomo';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@socialgouv/matomo-next', () => ({
  init: jest.fn(),
  push: jest.fn(),
}));

describe('Matomo', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('initializes Matomo when variables are set', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';

    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('param=value')
    );

    render(<Matomo />);

    expect(init).toHaveBeenCalledWith({
      siteId: '123',
      url: 'https://matomo.example.com',
    });
  });

  it('does not initialize Matomo if variables are missing', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = undefined;
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = undefined;

    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('param=value')
    );

    render(<Matomo />);

    expect(init).not.toHaveBeenCalled();
  });

  it('tracks page view when pathname or search params change', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';

    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('param=value')
    );

    render(<Matomo />);

    expect(push).toHaveBeenCalledWith([
      'setCustomUrl',
      '/test-path?param=value',
    ]);
    expect(push).toHaveBeenCalledWith(['trackPageView']);
  });

  it('encodes URL correctly when pathname and searchParams are present', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';

    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('param=value')
    );

    render(<Matomo />);

    expect(push).toHaveBeenCalledWith([
      'setCustomUrl',
      '/test-path?param=value',
    ]);
  });

  it('encodes URL correctly when pathname is present but searchParams are empty', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';

    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Matomo />);

    expect(push).toHaveBeenCalledWith(['setCustomUrl', '/test-path']);
  });
  it('does not render anything in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env = { ...process.env, NODE_ENV: 'development' };

    const { container } = render(<Matomo />);

    expect(container.firstChild).toBeNull();
    process.env = { ...process.env, NODE_ENV: originalEnv };
  });

  it('does not call push if pathname is not set', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';

    (usePathname as jest.Mock).mockReturnValue(null);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<Matomo />);

    expect(push).not.toHaveBeenCalled();
  });
  it('returns null when NODE_ENV is not production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env = { ...process.env, NODE_ENV: 'test' };

    const { container } = render(<Matomo />);
    expect(container.firstChild).toBeNull();
    process.env = { ...process.env, NODE_ENV: originalEnv };
  });

  it('returns null when NODE_ENV is production but no valid pathname', () => {
    process.env = { ...process.env, NODE_ENV: 'production' };
    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://matomo.example.com';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';

    (usePathname as jest.Mock).mockReturnValue(null);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const { container } = render(<Matomo />);

    expect(container.firstChild).toBeNull();
  });
});
