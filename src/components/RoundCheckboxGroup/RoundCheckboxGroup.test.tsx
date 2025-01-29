import { render, screen, fireEvent } from '@testing-library/react';

import RoundCheckboxGroup, { CheckboxOption } from './RoundCheckboxGroup';
import wording from '@/wording';

describe('RoundCheckboxGroup', () => {
  const mockOptions: CheckboxOption[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all options and labels correctly', () => {
    render(
      <RoundCheckboxGroup options={mockOptions} onChange={mockOnChange} />
    );

    expect(
      screen.getByText(wording.components.round_checkbox_group.insufficient)
    ).toBeInTheDocument();
    expect(
      screen.getByText(wording.components.round_checkbox_group.satisfactory)
    ).toBeInTheDocument();

    const inputs = screen.getAllByRole('checkbox');
    expect(inputs).toHaveLength(mockOptions.length);
  });

  it('handles checkbox selection correctly', () => {
    render(
      <RoundCheckboxGroup options={mockOptions} onChange={mockOnChange} />
    );

    const inputs = screen.getAllByRole('checkbox');

    fireEvent.click(inputs[0]);

    expect(mockOnChange).toHaveBeenCalledWith(1);

    expect(inputs[0]).toBeChecked();

    expect(inputs[1]).not.toBeChecked();
    expect(inputs[2]).not.toBeChecked();
  });

  it('updates selection when different option is clicked', () => {
    render(
      <RoundCheckboxGroup options={mockOptions} onChange={mockOnChange} />
    );

    const inputs = screen.getAllByRole('checkbox');

    fireEvent.click(inputs[0]);
    expect(mockOnChange).toHaveBeenCalledWith(1);

    fireEvent.click(inputs[2]);
    expect(mockOnChange).toHaveBeenCalledWith(3);

    expect(inputs[0]).not.toBeChecked();
    expect(inputs[2]).toBeChecked();
  });

  it('maintains selected state after re-render', () => {
    const { rerender } = render(
      <RoundCheckboxGroup options={mockOptions} onChange={mockOnChange} />
    );

    const inputs = screen.getAllByRole('checkbox');
    fireEvent.click(inputs[0]);

    rerender(
      <RoundCheckboxGroup options={mockOptions} onChange={mockOnChange} />
    );

    expect(inputs[0]).toBeChecked();
  });

  it('handles empty options array', () => {
    render(<RoundCheckboxGroup options={[]} onChange={mockOnChange} />);

    expect(
      screen.getByText(wording.components.round_checkbox_group.insufficient)
    ).toBeInTheDocument();
    expect(
      screen.getByText(wording.components.round_checkbox_group.satisfactory)
    ).toBeInTheDocument();

    const inputs = screen.queryAllByRole('checkbox');
    expect(inputs).toHaveLength(0);
  });
});
