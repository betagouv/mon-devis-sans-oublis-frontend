// src/components/Select/Select.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select'; // Adjust the import based on your structure

describe('Select Component', () => {
  const mockOnChange = jest.fn(); // Mock function for onChange

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  beforeEach(() => {
    render(
      <Select
        label='Select an option'
        onChange={mockOnChange}
        options={options}
        selectedValue=''
      />
    );
  });

  test('renders the label', () => {
    const labelElement = screen.getByLabelText(/select an option/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders the default option', () => {
    // Check for the default option using getByText
    const defaultOption = screen.getByText(/sélectionner une option/i);
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption).toBeDisabled(); // Check if it is disabled
  });

  test('renders all options', () => {
    options.forEach((option) => {
      const optionElement = screen.getByRole('option', { name: option.label });
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('calls onChange with the correct value when an option is selected', () => {
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '2' } });

    expect(mockOnChange).toHaveBeenCalledWith('2'); // Check if onChange was called with the correct value
  });
});
