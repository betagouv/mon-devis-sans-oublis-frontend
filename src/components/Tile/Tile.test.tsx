import { render, screen } from '@testing-library/react';

import Tile from './Tile';

describe('Tile Component', () => {
  const mockProps = {
    description: 'Test description',
    href: 'https://test.com',
    title: 'Test title',
  };

  it('renders without image', () => {
    render(<Tile {...mockProps} />);

    const titleLink = screen.getByRole('link', { name: mockProps.title });
    expect(titleLink).toHaveAttribute('href', mockProps.href);

    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    const contentDiv = screen.getByText(mockProps.description).parentElement;
    expect(contentDiv).toHaveClass('items-start!');
    expect(screen.getByText(mockProps.title).parentElement).toHaveClass(
      'text-left!'
    );
  });

  it('renders with image', () => {
    const propsWithImage = {
      ...mockProps,
      image: '/test-image.jpg',
    };

    render(<Tile {...propsWithImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', propsWithImage.title);
    expect(image).toHaveAttribute('width', '80');
    expect(image).toHaveAttribute('height', '80');

    const contentDiv = screen.getByText(
      propsWithImage.description
    ).parentElement;
    expect(contentDiv).toHaveClass('items-center!');
    expect(screen.getByText(propsWithImage.title).parentElement).toHaveClass(
      'text-center!'
    );
  });

  it('applies correct text color to title link when image is present', () => {
    const propsWithImage = {
      ...mockProps,
      image: '/test-image.jpg',
    };

    render(<Tile {...propsWithImage} />);

    const titleLink = screen.getByRole('link', { name: propsWithImage.title });
    expect(titleLink).toHaveClass('text-(--text-title-grey)!');
  });
});
