import { render, screen } from '@testing-library/react';

import Tile from './Tile';

describe('Tile', () => {
  const defaultProps = {
    description: 'Test description',
    href: '/test-link',
    title: 'Test title',
  };

  it('renders correctly with all props', () => {
    render(<Tile {...defaultProps} />);

    // Check if title is rendered with correct link
    const titleLink = screen.getByRole('link', { name: defaultProps.title });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', defaultProps.href);

    // Check if description is rendered
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders with different props values', () => {
    const newProps = {
      description: 'Another description',
      href: '/another-link',
      title: 'Another title',
    };

    render(<Tile {...newProps} />);

    expect(screen.getByText(newProps.title)).toBeInTheDocument();
    expect(screen.getByText(newProps.description)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: newProps.title })).toHaveAttribute(
      'href',
      newProps.href
    );
  });

  it('maintains correct HTML structure', () => {
    render(<Tile {...defaultProps} />);

    // Check if elements are nested correctly
    const container = screen
      .getByRole('link', { name: defaultProps.title })
      .closest('div');
    const title = screen.getByRole('heading');
    const description = screen.getByText(defaultProps.description);

    expect(container).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('handles long text content appropriately', () => {
    const longProps = {
      description:
        'A very long description that spans multiple lines and tests how the component handles lengthy content.',
      href: '/test',
      title:
        'A very long title that should still be rendered properly within the component',
    };

    render(<Tile {...longProps} />);

    expect(screen.getByText(longProps.title)).toBeInTheDocument();
    expect(screen.getByText(longProps.description)).toBeInTheDocument();
  });
});
