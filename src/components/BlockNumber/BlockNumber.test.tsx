import React from 'react';
import { render, screen } from '@testing-library/react';

import BlockNumber from './BlockNumber';

describe('BlockNumber', () => {
  const defaultProps = {
    description: 'Test description',
    number: 42,
    title: 'Test title',
  };

  it('renders correctly with required props', () => {
    render(<BlockNumber {...defaultProps} />);

    // Check if number is rendered
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('42')).toHaveClass('fr-display--sm', 'fr-m-0');

    // Check if title is rendered
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toHaveClass('fr-mb-1w');

    // Check if description is rendered
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const propsWithClassName = {
      ...defaultProps,
      className: 'custom-class',
    };

    render(<BlockNumber {...propsWithClassName} />);

    // Check if the container has the custom class
    const container = screen.getByText('42').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders with different prop values', () => {
    const newProps = {
      description: 'Another description',
      number: 123,
      title: 'Another title',
    };

    render(<BlockNumber {...newProps} />);

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Another title')).toBeInTheDocument();
    expect(screen.getByText('Another description')).toBeInTheDocument();
  });

  it('renders without className', () => {
    render(<BlockNumber {...defaultProps} />);

    const container = screen.getByText('42').parentElement;
    expect(container).not.toHaveClass('undefined');
    expect(container).not.toHaveClass('null');
  });

  it('maintains correct HTML structure', () => {
    render(<BlockNumber {...defaultProps} />);

    const number = screen.getByText('42');
    const title = screen.getByText('Test title');
    const description = screen.getByText('Test description');

    expect(number.tagName).toBe('H2');
    expect(title.tagName).toBe('H5');
    expect(description.tagName).toBe('P');
  });
});
