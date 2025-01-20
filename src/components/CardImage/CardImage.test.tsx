import { render, screen } from '@testing-library/react';

import CardImage, { CardImageProps } from './CardImage';

describe('CardImage Component', () => {
  const baseProps: CardImageProps = {
    description: 'This is a test description.',
    image: '/test-image.png',
    title: 'Test Title',
  };

  test('renders correctly with all props', () => {
    render(<CardImage {...baseProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();

    const image = screen.getByAltText('Test Title');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain(
      encodeURIComponent('/test-image.png')
    );
  });

  test('renders image with correct styles', () => {
    render(<CardImage {...baseProps} />);

    const image = screen.getByAltText('Test Title');
    expect(image).toHaveClass('w-auto h-[180px] max-w-full object-contain');
  });

  test('applies correct styles to the container', () => {
    render(<CardImage {...baseProps} />);

    const container = screen.getByText('Test Title').closest('div');
    expect(container).toHaveClass('p-8 pb-0 border-grey rounded-b-lg');
  });

  test('handles missing description gracefully', () => {
    render(
      <CardImage title='Test Title' image='/test-image.png' description='' />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(
      screen.queryByText('This is a test description.')
    ).not.toBeInTheDocument();
  });
});
