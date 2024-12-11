import { render, screen } from '@testing-library/react';

import CardIcon from './RoleCardImage';

describe('CardIcon Component', () => {
  const mockProps = {
    alt: 'Test image',
    description: 'Test description',
    image: 'test-image.jpg',
    title: 'Test title',
    url: '/test-url',
  };

  it('renders with all props correctly', () => {
    render(<CardIcon {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    const image = screen.getByAltText(mockProps.alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(mockProps.image)
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProps.url);
  });
});
