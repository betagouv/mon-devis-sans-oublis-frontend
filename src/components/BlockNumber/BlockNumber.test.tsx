import { render, screen } from '@testing-library/react';
import BlockNumber, { BlockNumberSize } from './BlockNumber';

describe('BlockNumber', () => {
  const defaultProps = {
    description: 'Test description',
    number: 42,
    title: 'Test title',
  };

  it('renders correctly with LARGE size', () => {
    render(<BlockNumber {...defaultProps} size={BlockNumberSize.LARGE} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('42')).toHaveClass('fr-display--sm', 'fr-m-0');
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toHaveClass('fr-mb-1w');
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders correctly with MEDIUM size', () => {
    render(<BlockNumber {...defaultProps} size={BlockNumberSize.MEDIUM} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('42')).toHaveClass(
      'fr-m-0 text-[var(--text-title-blue-france)]'
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toHaveClass('fr-mb-1w');
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders correctly with default size (LARGE) when size prop is not provided', () => {
    render(<BlockNumber {...defaultProps} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('42')).toHaveClass('fr-display--sm', 'fr-m-0');
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toHaveClass('fr-mb-1w');
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('hides description when not provided', () => {
    render(
      <BlockNumber
        {...{ ...defaultProps, description: undefined }}
        size={BlockNumberSize.LARGE}
      />
    );

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(
      <BlockNumber
        {...defaultProps}
        className='custom-class'
        size={BlockNumberSize.LARGE}
      />
    );

    const container = screen.getByText('42').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders with different prop values', () => {
    const newProps = {
      description: 'Another description',
      number: 123,
      title: 'Another title',
      size: BlockNumberSize.LARGE,
    };

    render(<BlockNumber {...newProps} />);

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Another title')).toBeInTheDocument();
    expect(screen.getByText('Another description')).toBeInTheDocument();
  });
});
