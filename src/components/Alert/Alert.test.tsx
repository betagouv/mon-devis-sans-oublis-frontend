import { render, screen, fireEvent } from '@testing-library/react';

import Alert from './Alert';

describe('Alert Component', () => {
  const defaultProps = {
    description: 'This is an alert message.',
    moreDescription: 'Here is some more information about the alert.',
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
    expect(moreInfoElement).not.toBeInTheDocument();
  });

  test('toggles more info visibility when clicked', () => {
    render(<Alert {...defaultProps} />);

    const toggleButton = screen.getByText(/voir plus/i);
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const moreDescriptionElement = screen.getByText(
      /here is some more information about the alert/i
    );
    expect(moreDescriptionElement).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Voir moins');

    fireEvent.click(toggleButton);

    expect(moreDescriptionElement).not.toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('Voir plus');
  });

  test('applies custom className if provided', () => {
    const customClass = 'custom-alert-class';
    render(<Alert {...defaultProps} className={customClass} />);

    const alertElement = screen
      .getByText(/this is an alert message/i)
      .closest('div');
    expect(alertElement).toHaveClass(customClass);
  });
});
