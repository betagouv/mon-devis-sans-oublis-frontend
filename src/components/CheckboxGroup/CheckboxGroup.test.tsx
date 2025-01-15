import { render, screen, fireEvent } from '@testing-library/react';

import CheckboxGroup from './CheckboxGroup';

describe('CheckboxGroup', () => {
  const mockOnChange = jest.fn();
  const mockOptions = [
    { id: '1', label: 'Option 1', checked: false },
    { id: '2', label: 'Option 2', checked: true },
    { id: '3', label: 'Option 3', checked: false },
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all options', () => {
    render(<CheckboxGroup options={mockOptions} />);

    mockOptions.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      const messageGroup = document.getElementById(`${option.id}-messages`);
      expect(messageGroup).toBeInTheDocument();
    });
  });

  it('renders with legend when provided', () => {
    render(<CheckboxGroup options={mockOptions} legend='Test Legend' />);
    expect(screen.getByText('Test Legend')).toBeInTheDocument();
  });

  it('renders without legend when not provided', () => {
    const { container } = render(<CheckboxGroup options={mockOptions} />);
    expect(
      container.querySelector('.fr-fieldset__legend')
    ).not.toBeInTheDocument();
  });

  it('renders options with correct checked state', () => {
    render(<CheckboxGroup options={mockOptions} />);

    const checkbox1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const checkbox2 = screen.getByLabelText('Option 2') as HTMLInputElement;

    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(true);
  });

  it('calls onChange when checkbox is clicked', () => {
    render(<CheckboxGroup options={mockOptions} onChange={mockOnChange} />);

    fireEvent.click(screen.getByLabelText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith('1', true);

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith('2', false);
  });

  it('handles checkbox click without onChange prop', () => {
    render(<CheckboxGroup options={mockOptions} />);

    fireEvent.click(screen.getByLabelText('Option 1'));
  });

  it('applies correct styling classes', () => {
    const { container } = render(<CheckboxGroup options={mockOptions} />);

    expect(container.querySelector('.fr-fieldset')).toBeInTheDocument();
    expect(container.querySelector('.fr-checkbox-group')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-labelledby',
      'checkboxes-legend checkboxes-messages'
    );

    const checkboxesMessages = document.getElementById('checkboxes-messages');
    expect(checkboxesMessages).toBeInTheDocument();
  });

  it('applies border class to all options except the last one', () => {
    const { container } = render(<CheckboxGroup options={mockOptions} />);

    const elements = container.querySelectorAll('.fr-fieldset__element');

    elements.forEach((element, index) => {
      if (index < elements.length - 1) {
        expect(element).toHaveClass('border-bottom-grey');
        expect(element).toHaveClass('pb-3');
      } else {
        expect(element).not.toHaveClass('border-bottom-grey');
        expect(element).not.toHaveClass('pb-3');
      }
    });
  });
});
