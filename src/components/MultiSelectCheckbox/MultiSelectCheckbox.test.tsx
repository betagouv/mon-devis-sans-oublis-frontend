import { render, screen, fireEvent } from '@testing-library/react';

import { MultiSelectCheckbox, Option } from './MultiSelectCheckbox';

describe('MultiSelectCheckbox', () => {
  const mockOnChange = jest.fn();

  const simpleOptions = ['Option 1', 'Option 2', 'Option 3'];
  const groupedOptions = [
    { id: '1', label: 'Option 1', group: 'Group 1' },
    { id: '2', label: 'Option 2', group: 'Group 1' },
    { id: '3', label: 'Option 3', group: 'Group 2' },
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with simple options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Select')).toBeInTheDocument();
    expect(
      screen.getByText('Sélectionner une ou plusieurs options')
    ).toBeInTheDocument();
  });

  it('renders with grouped options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={groupedOptions}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
  });

  it('shows optional text when optionnal prop is true', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
        optionnal={true}
      />
    );

    expect(screen.getByText('Optionnel')).toBeInTheDocument();
  });

  it('handles selection with simple options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith(['Option 1']);
  });

  it('handles selection with grouped options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={groupedOptions}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith(['1']);
  });

  it('displays multiple selections count', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByLabelText('Option 2'));

    expect(screen.getByText('2 sélections')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid='outside'>Outside</div>
        <MultiSelectCheckbox
          label='Test Select'
          options={simpleOptions}
          onChange={mockOnChange}
        />
      </div>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByLabelText('Option 1')).not.toBeInTheDocument();
  });

  it('displays initial selected values', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
        selectedValues={['Option 1']}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('displays initial selected values with grouped options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={groupedOptions}
        onChange={mockOnChange}
        selectedValues={['1']}
      />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('toggles dropdown visibility when clicking the button', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles unselection with simple options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
        selectedValues={['Option 1']}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('handles unselection with grouped options', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={groupedOptions}
        onChange={mockOnChange}
        selectedValues={['1']}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Option 1'));

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('handles empty options array', () => {
    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={[]}
        onChange={mockOnChange}
      />
    );

    expect(
      screen.getByText('Sélectionner une ou plusieurs options')
    ).toBeInTheDocument();
  });

  it('handles null provided_value in options', () => {
    const optionsWithNull = [
      { id: '1', label: 'Option 1', group: 'Group 1' },
      { id: '2', label: 'Option 2', group: null },
    ];

    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={optionsWithNull as Option[]}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = render(
      <MultiSelectCheckbox
        label='Test Select'
        options={simpleOptions}
        onChange={mockOnChange}
      />
    );

    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
    removeEventListenerSpy.mockRestore();
  });

  it('handles missing label in grouped options', () => {
    const optionsWithMissingLabel = [
      { id: '1', label: 'Option 1', group: 'Group 1' },
    ];

    render(
      <MultiSelectCheckbox
        label='Test Select'
        options={optionsWithMissingLabel as Option[]}
        onChange={mockOnChange}
        selectedValues={['non-existent-id']}
      />
    );

    expect(screen.getByText('non-existent-id')).toBeInTheDocument();
  });
});
