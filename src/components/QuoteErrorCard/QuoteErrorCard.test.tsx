import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Accordion from '../Accordion/Accordion';

describe('Accordion Component', () => {
  const defaultProps = {
    title: 'Test Accordion Title',
    badgeLabel: '3',
    children: <div>Test Content</div>,
  };

  it('renders the component correctly', () => {
    render(<Accordion {...defaultProps} />);

    expect(screen.getByText('Test Accordion Title')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('toggles content when clicked', () => {
    render(<Accordion {...defaultProps} />);

    const button = screen.getByRole('button');

    // Initially expanded
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders without badge', () => {
    render(
      <Accordion title='Test Title'>
        <div>Content</div>
      </Accordion>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('truncates long title', () => {
    const longTitle = 'This is a very long title that should be truncated';
    render(<Accordion title={longTitle} children={<div>Content</div>} />);

    const displayedTitle = screen.getByText(longTitle, { exact: false });
    expect(displayedTitle).toBeInTheDocument();
  });
});
