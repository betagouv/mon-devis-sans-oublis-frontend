import { render, screen } from '@testing-library/react';

import Tag from './Tag';

describe('Tag Component', () => {
  const defaultProps = {
    label: 'Beta',
  };

  it('renders with the provided label', () => {
    render(<Tag {...defaultProps} />);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders with different label lengths', () => {
    const { rerender } = render(<Tag label='A' />);
    expect(screen.getByText('A')).toBeInTheDocument();

    rerender(<Tag label='Very Long Label' />);
    expect(screen.getByText('Very Long Label')).toBeInTheDocument();
  });

  it('handles special characters', () => {
    render(<Tag label='Test & Demo' />);
    expect(screen.getByText('Test & Demo')).toBeInTheDocument();
  });

  it('is visually uppercase', () => {
    const { container } = render(<Tag label='test' />);
    const tag = container.firstChild;
    expect(tag).toHaveClass('uppercase');
  });
});
