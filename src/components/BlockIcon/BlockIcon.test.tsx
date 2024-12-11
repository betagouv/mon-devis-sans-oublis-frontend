import { render, screen } from '@testing-library/react';

import BlockIcon from './BlockIcon';
import { IconBackgroundVariant } from '../IconBackground/IconBackground';

// Mock the IconBackground component to simplify testing
jest.mock('../IconBackground/IconBackground', () => {
  return {
    __esModule: true,
    IconBackgroundVariant: {
      BLUE: 'blue',
      BLUE_LIGHT: 'blue-light',
      WHITE: 'white',
    },
    default: ({ icon, variant }: { icon: string; variant: string }) => (
      <div
        data-testid='icon-background'
        data-icon={icon}
        data-variant={variant}
      />
    ),
  };
});

describe('BlockIcon', () => {
  const defaultProps = {
    description: 'This is a description.',
    icon: 'test-icon',
    title: 'Test Title',
  };

  test('renders title, description, and IconBackground', () => {
    render(<BlockIcon {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    const iconBackground = screen.getByTestId('icon-background');
    expect(iconBackground).toBeInTheDocument();
    expect(iconBackground).toHaveAttribute('data-icon', defaultProps.icon);
    expect(iconBackground).toHaveAttribute(
      'data-variant',
      IconBackgroundVariant.BLUE_LIGHT
    );
  });
});
