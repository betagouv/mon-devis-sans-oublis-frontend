import { render, screen } from '@testing-library/react';

import BlockNumber from './BlockNumber';
import { useBreakpoint } from '@/hooks';

// Mock the useBreakpoint hook
jest.mock('@/hooks', () => ({
  useBreakpoint: jest.fn(),
}));

describe('BlockNumber', () => {
  const defaultProps = {
    description: 'Test description',
    number: 42,
    title: 'Test title',
  };

  // Helper function to set the breakpoint
  const setBreakpoint = (breakpoint: 'XS' | 'SM' | 'MD' | 'LG' | 'XL') => {
    (useBreakpoint as jest.Mock).mockReturnValue(breakpoint);
  };

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
    // Default to desktop view
    setBreakpoint('LG');
  });

  it('renders correctly with required props on desktop', () => {
    render(<BlockNumber {...defaultProps} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('42')).toHaveClass('fr-display--sm', 'fr-m-0');
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toHaveClass('fr-mb-1w');
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('hides description on mobile (XS breakpoint)', () => {
    setBreakpoint('XS');
    render(<BlockNumber {...defaultProps} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('hides description on mobile (SM breakpoint)', () => {
    setBreakpoint('SM');
    render(<BlockNumber {...defaultProps} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('shows description on tablet and above (MD breakpoint)', () => {
    setBreakpoint('MD');
    render(<BlockNumber {...defaultProps} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<BlockNumber {...defaultProps} className='custom-class' />);

    const container = screen.getByText('42').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders with different prop values', () => {
    const newProps = {
      description: 'Another description',
      number: 123,
      title: 'Another title',
    };

    render(<BlockNumber {...newProps} />);

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Another title')).toBeInTheDocument();
    expect(screen.getByText('Another description')).toBeInTheDocument();
  });

  it('renders without className', () => {
    render(<BlockNumber {...defaultProps} />);

    const container = screen.getByText('42').parentElement;
    expect(container).not.toHaveClass('undefined');
    expect(container).not.toHaveClass('null');
  });

  it('maintains correct HTML structure', () => {
    render(<BlockNumber {...defaultProps} />);

    const number = screen.getByText('42');
    const title = screen.getByText('Test title');
    const description = screen.getByText('Test description');

    expect(number.tagName).toBe('H2');
    expect(title.tagName).toBe('H5');
    expect(description.tagName).toBe('P');
  });
});
