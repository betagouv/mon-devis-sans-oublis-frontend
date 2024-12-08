import { render, screen } from '@testing-library/react';

import BlockIcon from './BlockIcon';

// Mock the IconBackground component
jest.mock('../IconBackground/IconBackground', () => {
  return function MockIconBackground({ icon }: { icon: string }) {
    return <div data-testid='mock-icon-background'>{icon}</div>;
  };
});

describe('BlockIcon', () => {
  const mockProps = {
    description: 'Test description',
    icon: 'test-icon',
    title: 'Test title',
  };

  it('renders correctly with all props', () => {
    render(<BlockIcon {...mockProps} />);

    expect(screen.getByText('Test title')).toBeInTheDocument();

    expect(screen.getByText('Test description')).toBeInTheDocument();

    const iconBackground = screen.getByTestId('mock-icon-background');
    expect(iconBackground).toBeInTheDocument();
    expect(iconBackground).toHaveTextContent('test-icon');
  });

  it('renders with different props values', () => {
    const newProps = {
      description: 'Another description',
      icon: 'another-icon',
      title: 'Another title',
    };

    render(<BlockIcon {...newProps} />);

    expect(screen.getByText('Another title')).toBeInTheDocument();
    expect(screen.getByText('Another description')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon-background')).toHaveTextContent(
      'another-icon'
    );
  });
});
