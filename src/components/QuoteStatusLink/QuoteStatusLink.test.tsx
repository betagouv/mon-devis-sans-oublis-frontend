import { render, screen } from '@testing-library/react';

import QuoteStatusLink, { QuoteStatusVariant } from './QuoteStatusLink';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    alt,
    height,
    src,
    width,
  }: {
    alt: string;
    height: number;
    src: string;
    width: number;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} height={height} src={src} width={width} />;
  },
}));

describe('QuoteStatusLink Component', () => {
  const defaultProps = {
    imageAlt: 'Sample Image',
    imageSrc: '/sample-image.webp',
    linkHref: '/sample-link',
    linkLabel: 'Sample Link',
    title: 'Sample Title',
    variant: QuoteStatusVariant.PRIMARY,
  };

  it('renders the component with provided props', () => {
    render(<QuoteStatusLink {...defaultProps} />);

    // Check the image
    const image = screen.getByAltText('Sample Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/sample-image.webp');

    // Check the title
    const titleElement = screen.getByText('Sample Title');
    expect(titleElement).toBeInTheDocument();

    // Check the link
    const linkElement = screen.getByText('Sample Link').closest('a');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/sample-link');
  });

  it('applies the correct background color for the PRIMARY variant', () => {
    render(
      <QuoteStatusLink {...defaultProps} variant={QuoteStatusVariant.PRIMARY} />
    );
    const container =
      screen.getByText('Sample Title').parentElement?.parentElement;
    expect(container).toHaveClass('bg-[var(--background-alt-blue-france)]');
  });

  it('applies the correct background color for the SECONDARY variant', () => {
    render(
      <QuoteStatusLink
        {...defaultProps}
        variant={QuoteStatusVariant.SECONDARY}
      />
    );
    const container =
      screen.getByText('Sample Title').parentElement?.parentElement;
    expect(container).toHaveClass('bg-[var(--background-default-grey)]');
  });

  it('renders dynamic title and link label', () => {
    render(
      <QuoteStatusLink
        {...defaultProps}
        title='Dynamic Title'
        linkLabel='Dynamic Link'
      />
    );

    const titleElement = screen.getByText('Dynamic Title');
    const linkElement = screen.getByText('Dynamic Link');

    expect(titleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('renders the Link component with SMALL size', () => {
    render(<QuoteStatusLink {...defaultProps} />);
    const linkElement = screen.getByText('Sample Link').closest('a');
    expect(linkElement).toHaveClass('fr-btn--sm');
  });
});
