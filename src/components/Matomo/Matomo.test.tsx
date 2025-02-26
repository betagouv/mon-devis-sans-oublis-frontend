import { render, waitFor } from '@testing-library/react';
import { init, push } from '@socialgouv/matomo-next';

import Matomo from './Matomo';

jest.mock('@socialgouv/matomo-next', () => ({
  init: jest.fn(),
  push: jest.fn(),
}));

const mockUsePathname = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
}));

describe('Matomo Tracking', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.clearAllMocks();
    originalEnv = { ...process.env };

    process.env.NEXT_PUBLIC_MATOMO_URL = 'https://example.com/matomo';
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = '123';
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('initializes Matomo only once', async () => {
    mockUsePathname.mockReturnValue('/test-path');
    mockUseSearchParams.mockReturnValue(new URLSearchParams('param=value'));

    render(<Matomo />);

    await waitFor(() => {
      expect(init).toHaveBeenCalledTimes(1);
      expect(init).toHaveBeenCalledWith({
        siteId: '123',
        url: 'https://example.com/matomo',
      });
    });
  });

  it('sends tracking events when the route changes', async () => {
    mockUsePathname.mockReturnValue('/test-path');
    mockUseSearchParams.mockReturnValue(new URLSearchParams('param=value'));

    render(<Matomo />);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith([
        'setCustomUrl',
        '/test-path?param=value',
      ]);
      expect(push).toHaveBeenCalledWith(['trackPageView']);
    });
  });

  it('does not send tracking events if pathname is null', async () => {
    mockUsePathname.mockReturnValue(null);
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<Matomo />);

    await waitFor(() => {
      expect(push).not.toHaveBeenCalledWith([
        'setCustomUrl',
        expect.any(String),
      ]);
      expect(push).not.toHaveBeenCalledWith(['trackPageView']);
    });
  });

  it('sends tracking event with pathname but without searchParams', async () => {
    mockUsePathname.mockReturnValue('/test-path');
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<Matomo />);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(['setCustomUrl', '/test-path']);
      expect(push).toHaveBeenCalledWith(['trackPageView']);
    });
  });

  it('does not render anything in development environment', () => {
    jest.resetModules();
    process.env = { ...originalEnv, NODE_ENV: 'development' };

    const { container } = render(<Matomo />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render anything in production environment', () => {
    jest.resetModules();
    process.env = { ...originalEnv, NODE_ENV: 'production' };

    const { container } = render(<Matomo />);
    expect(container.firstChild).toBeNull();
  });
});
