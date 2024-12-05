import React from 'react';
import { render } from '@testing-library/react';

import IconBackground from './IconBackground';

describe('IconBackground', () => {
  it('renders correctly with icon prop', () => {
    const { container } = render(<IconBackground icon='test-icon' />);
    const element = container.firstChild;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('test-icon');
  });

  it('renders with different icon values', () => {
    const { container, rerender } = render(<IconBackground icon='icon-1' />);
    let element = container.firstChild;
    expect(element).toHaveClass('icon-1');

    rerender(<IconBackground icon='icon-2' />);
    element = container.firstChild;
    expect(element).toHaveClass('icon-2');
  });

  it('renders with empty icon string', () => {
    const { container } = render(<IconBackground icon='' />);
    const element = container.firstChild;
    expect(element).toBeInTheDocument();
  });
});
