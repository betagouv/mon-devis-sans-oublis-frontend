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

    // Check if title is rendered
    expect(screen.getByText('Test title')).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText('Test description')).toBeInTheDocument();

    // Check if IconBackground is rendered with correct icon prop
    const iconBackground = screen.getByTestId('mock-icon-background');
    expect(iconBackground).toBeInTheDocument();
    expect(iconBackground).toHaveTextContent('test-icon');
  });

  it('applies correct CSS classes', () => {
    render(<BlockIcon {...mockProps} />);

    // Check main container classes
    expect(screen.getByText('Test title').parentElement).toHaveClass(
      'fr-col-md',
      'text-center'
    );

    // Check icon container class
    expect(
      screen.getByTestId('mock-icon-background').parentElement
    ).toHaveClass('content-center');

    // Check title class
    expect(screen.getByText('Test title')).toHaveClass('fr-mt-2w');
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
