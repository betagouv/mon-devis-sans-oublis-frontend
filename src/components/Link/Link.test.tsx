import { render, screen } from '@testing-library/react';

import Link from './Link';

// Mock next/link
jest.mock('next/link', () => {
  const MockNextLink = ({
    className,
    children,
    href,
  }: {
    className: string;
    children: React.ReactNode;
    href: string;
  }) => {
    return (
      <a href={href} className={className} data-testid='next-link'>
        {children}
      </a>
    );
  };

  MockNextLink.displayName = 'MockNextLink';
  return MockNextLink;
});

describe('Link', () => {
  const defaultProps = {
    href: '/test',
    label: 'Test Link',
  };

  it('renders correctly with minimal required props', () => {
    render(<Link {...defaultProps} />);

    const link = screen.getByTestId('next-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Test Link');
    expect(link).toHaveClass('fr-btn', 'fr-text--lg');
    expect(link).not.toHaveClass('fr-btn--secondary');
    expect(link).not.toHaveClass('fr-btn--icon-right');
  });

  it('renders with secondary variant', () => {
    render(<Link {...defaultProps} variant='secondary' />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveClass('fr-btn--secondary');
  });

  it('renders with icon', () => {
    const icon = 'fr-icon-arrow-right-line';
    render(<Link {...defaultProps} icon={icon} />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveClass('fr-btn--icon-right', icon);
  });

  it('combines all props correctly', () => {
    const props = {
      ...defaultProps,
      icon: 'fr-icon-arrow-right-line',
      variant: 'secondary' as const,
    };

    render(<Link {...props} />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveClass(
      'fr-btn',
      'fr-btn--icon-right',
      'fr-icon-arrow-right-line',
      'fr-text--lg',
      'fr-btn--secondary'
    );
  });

  it('defaults to primary variant when variant is not specified', () => {
    render(<Link {...defaultProps} />);

    const link = screen.getByTestId('next-link');
    expect(link).not.toHaveClass('fr-btn--secondary');
  });

  it('handles different href values', () => {
    render(<Link {...defaultProps} href='/different-path' />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '/different-path');
  });

  it('handles different label values', () => {
    render(<Link {...defaultProps} label='Different Label' />);

    const link = screen.getByTestId('next-link');
    expect(link).toHaveTextContent('Different Label');
  });

  it('handles empty icon prop correctly', () => {
    render(<Link {...defaultProps} icon='' />);

    const link = screen.getByTestId('next-link');
    expect(link).not.toHaveClass('fr-btn--icon-right');
  });
});
