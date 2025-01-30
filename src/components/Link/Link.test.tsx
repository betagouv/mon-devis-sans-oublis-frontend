import { render, screen } from '@testing-library/react';

import Link, { LinkSize, LinkVariant } from './Link';

describe('Link', () => {
  const mockOnClick = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders with default props', () => {
    render(<Link href='/test' label='Test Link' />);
    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveClass('fr-btn', 'fr-btn--primary');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Link href='/test' label='Test Link' size={LinkSize.LARGE} />
    );
    expect(screen.getByText('Test Link').closest('a')).toHaveClass(
      'fr-btn--lg'
    );

    rerender(<Link href='/test' label='Test Link' size={LinkSize.SMALL} />);
    expect(screen.getByText('Test Link').closest('a')).toHaveClass(
      'fr-btn--sm'
    );
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Link href='/test' label='Test Link' variant={LinkVariant.SECONDARY} />
    );
    expect(screen.getByText('Test Link').closest('a')).toHaveClass(
      'fr-btn--secondary'
    );

    rerender(
      <Link href='/test' label='Test Link' variant={LinkVariant.DISABLED} />
    );
    expect(screen.getByText('Test Link').closest('a')).toHaveClass(
      'bg-(--background-disabled-grey)!',
      'text-(--text-disabled-grey)!',
      'cursor-not-allowed!'
    );
  });

  it('handles click events', () => {
    render(<Link href='/test' label='Test Link' onClick={mockOnClick} />);
    screen.getByText('Test Link').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('handles submit events', () => {
    render(<Link href='/test' label='Test Link' onSubmit={mockOnSubmit} />);
    screen.getByText('Test Link').click();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('prevents default on disabled variant', () => {
    const onClick = jest.fn();
    render(
      <Link
        href='/test'
        label='Test Link'
        variant={LinkVariant.DISABLED}
        onClick={onClick}
      />
    );

    const link = screen.getByText('Test Link').closest('a');
    const mockEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    link?.dispatchEvent(mockEvent);
    expect(mockEvent.defaultPrevented).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with icon', () => {
    render(<Link href='/test' label='Test Link' icon='fr-icon-test' />);
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass('fr-btn--icon-right', 'fr-icon-test');
  });

  it('handles legacy behavior', () => {
    render(<Link href='/test' label='Test Link' legacyBehavior />);
    const link = screen.getByText('Test Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('applies correct text size classes', () => {
    const { rerender } = render(<Link href='/test' label='Test Link' />);
    expect(screen.getByText('Test Link')).toHaveClass('fr-text--lg');

    rerender(<Link href='/test' label='Test Link' size={LinkSize.SMALL} />);
    expect(screen.getByText('Test Link')).toHaveClass('fr-text--sm');
  });

  it('handles both onClick and onSubmit', () => {
    render(
      <Link
        href='/test'
        label='Test Link'
        onClick={mockOnClick}
        onSubmit={mockOnSubmit}
      />
    );

    screen.getByText('Test Link').click();
    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('sets empty href when disabled', () => {
    render(
      <Link href='/test' label='Test Link' variant={LinkVariant.DISABLED} />
    );
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveAttribute('href', '');
  });

  it('preserves href when not disabled', () => {
    render(<Link href='/test' label='Test Link' />);
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveAttribute('href', '/test');
  });
});
