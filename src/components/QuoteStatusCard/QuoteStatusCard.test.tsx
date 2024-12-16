import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import QuoteStatusCard from './QuoteStatusCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    alt,
    className,
    height,
    src,
    width,
  }: {
    alt?: string;
    className?: string;
    height?: number | string;
    src: string;
    width?: number | string;
  }) {
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

describe('QuoteStatusCard component', () => {
  const defaultProps = {
    description: 'This is a test description',
    descriptionKOMore: 'This is an additional KO description',
    descriptionOKMore: 'This is an additional OK description',
    imageAlt: 'Test Image Alt Text',
    imageSrc: '/test-image.png',
    title: 'Test Title',
  };

  it('renders the component with all props', () => {
    render(<QuoteStatusCard {...defaultProps} />);

    // Check title
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Check main description
    expect(screen.getByText('This is a test description')).toBeInTheDocument();

    // Check additional KO description
    expect(
      screen.getByText('This is an additional KO description')
    ).toBeInTheDocument();

    // Check additional OK description
    const okDescriptions = screen.getAllByText(
      'This is an additional OK description'
    );
    expect(okDescriptions).toHaveLength(2);
  });

  it('does not render additional descriptions if not provided', () => {
    render(
      <QuoteStatusCard
        {...defaultProps}
        descriptionKOMore={undefined}
        descriptionOKMore={undefined}
      />
    );

    // KO description should not be rendered
    expect(
      screen.queryByText('This is an additional KO description')
    ).not.toBeInTheDocument();

    // OK description should not be rendered
    expect(
      screen.queryByText('This is an additional OK description')
    ).not.toBeInTheDocument();
  });

  it('renders the image with correct alt text and src', () => {
    render(<QuoteStatusCard {...defaultProps} />);

    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2); // Mobile and Desktop versions

    // Check image attributes
    expect(images[0]).toHaveAttribute('data-alt', 'Test Image Alt Text');
    expect(images[0]).toHaveAttribute('data-src', '/test-image.png');
    expect(images[0]).toHaveAttribute('data-width', '299');
    expect(images[0]).toHaveAttribute('data-height', '140');

    expect(images[1]).toHaveAttribute('data-alt', 'Test Image Alt Text');
    expect(images[1]).toHaveAttribute('data-src', '/test-image.png');
    expect(images[1]).toHaveAttribute('data-width', '299');
    expect(images[1]).toHaveAttribute('data-height', '160');
  });
});
