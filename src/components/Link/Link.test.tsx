import { render, screen, fireEvent } from '@testing-library/react';

import Link, { LinkSize, LinkVariant } from './Link';

describe('Link Component', () => {
  const defaultProps = {
    href: '/test',
    label: 'Test Link',
  };

  it('renders the component with default props', () => {
    render(<Link {...defaultProps} />);
    const linkElement = screen.getByText(/Test Link/i);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/test');
    expect(linkElement.closest('a')).toHaveClass('fr-btn fr-btn--primary');
  });

  it('applies the correct class for LARGE size', () => {
    render(<Link {...defaultProps} size={LinkSize.LARGE} />);
    const linkElement = screen.getByText(/Test Link/i);

    expect(linkElement.closest('a')).toHaveClass('fr-btn--lg');
  });

  it('applies the correct class for SMALL size', () => {
    render(<Link {...defaultProps} size={LinkSize.SMALL} />);
    const linkElement = screen.getByText(/Test Link/i);

    expect(linkElement.closest('a')).toHaveClass('fr-btn--sm');
  });

  it('applies the correct class for the SECONDARY variant', () => {
    render(<Link {...defaultProps} variant={LinkVariant.SECONDARY} />);
    const linkElement = screen.getByText(/Test Link/i);

    expect(linkElement.closest('a')).toHaveClass('fr-btn--secondary');
  });

  it('applies the disabled styles and prevents navigation', () => {
    render(<Link {...defaultProps} variant={LinkVariant.DISABLED} />);
    const linkElement = screen.getByText(/Test Link/i);

    expect(linkElement.closest('a')).toHaveClass(
      'fr-btn fr-btn--disabled !bg-[var(--background-disabled-grey)] !text-[var(--text-disabled-grey)] !cursor-not-allowed'
    );
    expect(linkElement.closest('a')).toHaveAttribute('href', '');
  });

  it('calls the onSubmit handler when clicked', () => {
    const mockOnSubmit = jest.fn();
    render(<Link {...defaultProps} onSubmit={mockOnSubmit} />);
    const linkElement = screen.getByText(/Test Link/i);

    fireEvent.click(linkElement.closest('a')!);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('renders with an icon when provided', () => {
    render(<Link {...defaultProps} icon='fr-icon-example' />);
    const linkElement = screen.getByText(/Test Link/i);

    expect(linkElement.closest('a')).toHaveClass(
      'fr-btn--icon-right fr-icon-example'
    );
  });

  it('does not call onSubmit if not provided', () => {
    render(<Link {...defaultProps} />);
    const linkElement = screen.getByText(/Test Link/i);

    fireEvent.click(linkElement.closest('a')!);
    // No error means no unexpected call was made
  });

  it('applies the correct text size class for SMALL size', () => {
    render(<Link {...defaultProps} size={LinkSize.SMALL} />);
    const textElement = screen.getByText(/Test Link/i);

    expect(textElement).toHaveClass('fr-text--sm');
  });

  it('applies the correct text size class for default or LARGE size', () => {
    render(<Link {...defaultProps} size={LinkSize.LARGE} />);
    const textElement = screen.getByText(/Test Link/i);

    expect(textElement).toHaveClass('fr-text--lg');
  });
});
