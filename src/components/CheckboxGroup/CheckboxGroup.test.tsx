import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup';

describe('CheckboxGroup Component', () => {
  const baseProps: CheckboxGroupProps = {
    legend: 'Test Legend',
    options: [
      { id: 'option1', label: 'Option 1', checked: false },
      { id: 'option2', label: 'Option 2', checked: true },
      { id: 'option3', label: 'Option 3', checked: false },
    ],
    onChange: jest.fn(),
  };

  test('renders the CheckboxGroup component without errors', () => {
    render(<CheckboxGroup options={[]} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  test('renders the legend when provided', () => {
    render(<CheckboxGroup {...baseProps} />);

    expect(screen.getByText('Test Legend')).toBeInTheDocument();
    expect(screen.getByText('Test Legend')).toHaveClass('fr-fieldset__legend');
  });

  test('renders all checkboxes with correct labels', () => {
    render(<CheckboxGroup {...baseProps} />);

    baseProps.options.forEach((option) => {
      const checkbox = screen.getByLabelText(option.label);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', option.id);
      expect(checkbox).toHaveProperty('checked', option.checked);
    });
  });

  test('calls onChange when a checkbox is clicked', () => {
    const handleChange = jest.fn();
    render(<CheckboxGroup {...baseProps} onChange={handleChange} />);

    const checkbox = screen.getByLabelText('Option 1');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option1', true);
  });

  test('updates the checkbox state when clicked', () => {
    const options = [
      { id: 'option1', label: 'Option 1', checked: false },
      { id: 'option2', label: 'Option 2', checked: true },
    ];

    const TestWrapper = () => {
      const [checkboxOptions, setCheckboxOptions] = React.useState(options);

      const handleChange = (id: string, checked: boolean) => {
        setCheckboxOptions((prevOptions) =>
          prevOptions.map((option) =>
            option.id === id ? { ...option, checked } : option
          )
        );
      };

      return (
        <CheckboxGroup options={checkboxOptions} onChange={handleChange} />
      );
    };

    render(<TestWrapper />);

    const checkbox = screen.getByLabelText('Option 1');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('renders without a legend when not provided', () => {
    render(<CheckboxGroup options={baseProps.options} />);

    expect(screen.queryByText('Test Legend')).not.toBeInTheDocument();
  });

  test('applies correct classes to checkboxes', () => {
    render(<CheckboxGroup {...baseProps} />);

    const checkboxGroup = screen.getByLabelText('Option 1').closest('div');
    expect(checkboxGroup).toHaveClass('fr-checkbox-group');
  });

  test('applies the correct class to the last checkbox element', () => {
    render(<CheckboxGroup {...baseProps} />);

    const lastCheckbox = screen
      .getByLabelText('Option 3')
      .closest('.fr-fieldset__element');
    expect(lastCheckbox).not.toHaveClass('border-bottom-grey pb-3');
  });

  test('renders aria-live regions for accessibility', () => {
    render(<CheckboxGroup {...baseProps} />);

    baseProps.options.forEach((option) => {
      const ariaRegion = screen.getByTestId('checkboxes-messages-assertive');
      expect(ariaRegion).toHaveAttribute('aria-live', 'assertive');
    });
  });
});
