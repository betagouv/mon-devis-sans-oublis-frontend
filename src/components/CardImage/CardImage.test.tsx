import React from 'react';
import { render } from '@testing-library/react';

import CardImage from './CardImage';

interface MockImageProps {
  alt: string;
  className?: string;
  height: number | string;
  src: string;
  width: number | string;
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    alt,
    className,
    height,
    src,
    width,
  }: MockImageProps) {
    return (
      <div
        className={className}
        data-alt={alt}
        data-height={height}
        data-src={src}
        data-testid='next-image'
        data-width={width}
      />
    );
  },
}));

describe('CardImage', () => {
  const defaultProps = {
    image: 'test-image.jpg',
    title: 'Test Title',
  };

  it('renders with correct props', () => {
    const { getByTestId, getByText } = render(<CardImage {...defaultProps} />);

    const image = getByTestId('next-image');
    expect(image).toHaveAttribute('data-src', '/images/test-image.jpg');
    expect(image).toHaveAttribute('data-alt', 'Test Title');
    expect(image).toHaveAttribute('data-height', '120');
    expect(image).toHaveAttribute('data-width', '120');

    const title = getByText('Test Title');
    expect(title.tagName).toBe('H6');
  });

  it('handles different props', () => {
    const props = {
      image: 'another-image.png',
      title: 'Another Title',
    };

    const { getByTestId, getByText } = render(<CardImage {...props} />);

    const image = getByTestId('next-image');
    expect(image).toHaveAttribute('data-src', '/images/another-image.png');
    expect(getByText('Another Title')).toBeInTheDocument();
  });

  it('handles empty image', () => {
    const { getByTestId } = render(<CardImage image='' title='No Image' />);

    const image = getByTestId('next-image');
    expect(image).toHaveAttribute('data-src', '/images/');
  });
});
