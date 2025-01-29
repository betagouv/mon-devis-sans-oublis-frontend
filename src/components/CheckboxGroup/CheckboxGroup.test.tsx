import { render, screen, fireEvent } from '@testing-library/react';

import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup';

describe('CheckboxGroup Component', () => {
  const defaultProps: CheckboxGroupProps = {
    legend: 'Select your options',
    onChange: jest.fn(),
    options: [
      { id: 'option1', label: 'Option 1', checked: false },
      { id: 'option2', label: 'Option 2', checked: true },
    ],
  };

  it('renders checkbox group with legend', () => {
    render(<CheckboxGroup {...defaultProps} />);

    expect(screen.getByText(defaultProps.legend as string)).toBeInTheDocument();
  });

  it('renders checkboxes with correct labels and checked state', () => {
    render(<CheckboxGroup {...defaultProps} />);

    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const checkbox2 = screen.getByLabelText('Option 2') as HTMLInputElement;

    expect(checkbox1).toBeInTheDocument();
    expect(checkbox2).toBeInTheDocument();
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
  });

  it('calls onChange when a checkbox is clicked', () => {
    render(<CheckboxGroup {...defaultProps} />);

    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;

    fireEvent.click(checkbox1);

    expect(defaultProps.onChange).toHaveBeenCalledWith('option1', true);
  });

  it('does not render legend if not provided', () => {
    render(<CheckboxGroup {...defaultProps} legend={undefined} />);

    expect(
      screen.queryByText(defaultProps.legend as string)
    ).not.toBeInTheDocument();
  });

  it('applies border-bottom-grey class to all but the last checkbox', () => {
    render(<CheckboxGroup {...defaultProps} />);

    const checkboxContainers = screen
      .getAllByRole('checkbox')
      .map((input) => input.closest('.fr-fieldset__element'));

    expect(checkboxContainers[0]).toHaveClass('border-bottom-grey');
    expect(checkboxContainers[1]).not.toHaveClass('border-bottom-grey');
  });

  it('sets correct aria attributes', () => {
    render(<CheckboxGroup {...defaultProps} />);

    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    expect(checkbox1).toHaveAttribute('aria-describedby', 'option1-messages');

    const messagesGroup = screen.getByTestId('checkboxes-messages-assertive');
    expect(messagesGroup).toBeInTheDocument();
  });

  it('renders checkbox without checked attribute if checked is undefined', () => {
    const uncheckedOptions = [{ id: 'option1', label: 'Option 1' }];

    render(<CheckboxGroup options={uncheckedOptions} />);

    const checkbox = screen.getByLabelText('Option 1') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
  });
});
