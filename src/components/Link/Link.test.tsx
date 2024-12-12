import { render, screen, fireEvent } from '@testing-library/react';

import Link, { LinkVariant } from './Link';

describe('Link Component', () => {
  it('renders the label correctly', () => {
    render(<Link href='/test' label='Test Link' />);
    const linkElement = screen.getByText(/Test Link/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('applies the primary variant by default', () => {
    render(<Link href='/test' label='Primary Link' />);
    const linkElement = screen.getByText(/Primary Link/i);
    expect(linkElement).toHaveClass('fr-btn');
    expect(linkElement).not.toHaveClass('fr-btn--secondary');
  });

  it('applies the secondary variant class when provided', () => {
    render(
      <Link
        href='/test'
        label='Secondary Link'
        variant={LinkVariant.SECONDARY}
      />
    );
    const linkElement = screen.getByText(/Secondary Link/i);
    expect(linkElement).toHaveClass('fr-btn--secondary');
  });

  it('applies the disabled variant class and prevents navigation', () => {
    render(
      <Link href='/test' label='Disabled Link' variant={LinkVariant.DISABLED} />
    );
    const linkElement = screen.getByText(/Disabled Link/i);
    expect(linkElement).toHaveClass(
      'bg-[var(--background-disabled-grey)]',
      'text-[var(--text-disabled-grey)]',
      'pointer-events-none'
    );
    expect(linkElement).toHaveAttribute('href', '');
  });

  it('calls onSubmit when clicked and prevents default behavior', () => {
    const onSubmitMock = jest.fn();
    render(<Link href='/test' label='Submit Link' onSubmit={onSubmitMock} />);

    const linkElement = screen.getByText(/Submit Link/i);
    fireEvent.click(linkElement);

    expect(onSubmitMock).toHaveBeenCalled();
    expect(onSubmitMock.mock.calls[0][0]).toBeInstanceOf(Event);
  });

  it('renders with an icon if provided', () => {
    render(<Link href='/test' label='Icon Link' icon='fr-icon-example' />);
    const linkElement = screen.getByText(/Icon Link/i);
    expect(linkElement).toHaveClass('fr-btn--icon-right', 'fr-icon-example');
  });

  it('does not call onSubmit if not provided', () => {
    const onSubmitMock = jest.fn();
    render(<Link href='/test' label='No Submit Link' />);
    const linkElement = screen.getByText(/No Submit Link/i);

    fireEvent.click(linkElement);
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
