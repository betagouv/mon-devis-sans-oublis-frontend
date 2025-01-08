import { render } from '@testing-library/react';
import { init, push } from '@socialgouv/matomo-next';

import Matomo from './Matomo';

// Mock the matomo-next package
jest.mock('@socialgouv/matomo-next', () => ({
  init: jest.fn(),
  push: jest.fn(),
}));

// Create mock functions outside so we can reference them in tests
const mockUsePathname = jest.fn(() => '/test-path');
const mockUseSearchParams = jest.fn(() => ({ toString: () => 'param=1' }));

// Update the mock to use our referenced functions
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
}));

describe('Matomo', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock implementations to default values
    mockUsePathname.mockImplementation(() => '/test-path');
    mockUseSearchParams.mockImplementation(() => ({
      toString: () => 'param=1',
    }));
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_MATOMO_URL: 'https://matomo.test',
      NEXT_PUBLIC_MATOMO_SITE_ID: '1',
    };
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      configurable: true,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should initialize Matomo with correct parameters', () => {
    render(<Matomo />);

    expect(init).toHaveBeenCalledWith({
      url: 'https://matomo.test',
      siteId: '1',
    });
  });

  it('should track page view with correct URL', () => {
    render(<Matomo />);

    expect(push).toHaveBeenCalledWith(['setCustomUrl', '/test-path?param=1']);
    expect(push).toHaveBeenCalledWith(['trackPageView']);
  });

  it('should not initialize Matomo if environment variables are missing', () => {
    process.env.NEXT_PUBLIC_MATOMO_URL = undefined;
    process.env.NEXT_PUBLIC_MATOMO_SITE_ID = undefined;

    render(<Matomo />);

    expect(init).not.toHaveBeenCalled();
  });

  it('should not render anything in development environment', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    });

    const { container } = render(<Matomo />);

    expect(container.firstChild).toBeNull();
  });

  it('should not track page view when pathname is null', () => {
    // Update the mock to return null
    mockUsePathname.mockImplementation(() => '');

    render(<Matomo />);

    expect(push).not.toHaveBeenCalledWith(['setCustomUrl', expect.any(String)]);
    expect(push).not.toHaveBeenCalledWith(['trackPageView']);
  });
});
