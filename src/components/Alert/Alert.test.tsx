import { render, screen, fireEvent } from '@testing-library/react';

import Alert from './Alert';

describe('Alert Component', () => {
  const defaultProps = {
    description: 'This is an alert message.',
    moreInfo: 'Here is some more information about the alert.',
  };

  test('renders the alert with description', () => {
    render(<Alert {...defaultProps} />);

    const descriptionElement = screen.getByText(/this is an alert message/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders the alert with more info hidden by default', () => {
    render(<Alert {...defaultProps} />);

    const moreInfoElement = screen.queryByText(
      /here is some more information about the alert/i
    );
    expect(moreInfoElement).not.toBeInTheDocument(); // More info should not be visible initially
  });

  test('toggles more info visibility when clicked', () => {
    render(<Alert {...defaultProps} />);

    const toggleButton = screen.getByText(/voir plus/i); // "See more" in French
    expect(toggleButton).toBeInTheDocument();

    // Click to show more info
    fireEvent.click(toggleButton);

    const moreInfoElement = screen.getByText(
      /here is some more information about the alert/i
    );
    expect(moreInfoElement).toBeInTheDocument(); // More info should be visible now
    expect(toggleButton).toHaveTextContent('Voir moins'); // Button text should change to "See less"

    // Click to hide more info
    fireEvent.click(toggleButton);

    expect(moreInfoElement).not.toBeInTheDocument(); // More info should be hidden again
    expect(toggleButton).toHaveTextContent('Voir plus'); // Button text should change back to "See more"
  });

  test('applies custom className if provided', () => {
    const customClass = 'custom-alert-class';
    render(<Alert {...defaultProps} className={customClass} />);

    const alertElement = screen
      .getByText(/this is an alert message/i)
      .closest('div');
    expect(alertElement).toHaveClass(customClass); // Check if the custom class is applied
  });
});
