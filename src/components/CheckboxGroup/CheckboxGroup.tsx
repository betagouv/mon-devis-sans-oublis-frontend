export interface CheckboxOption {
  checked?: boolean;
  id: string;
  label: string;
}

export interface CheckboxGroupProps {
  legend?: string;
  onChange?: (id: string, checked: boolean) => void;
  options: CheckboxOption[];
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  legend,
  onChange,
  options,
}) => {
  return (
    <fieldset
      aria-labelledby='checkboxes-legend checkboxes-messages'
      className='fr-fieldset w-full'
      id='checkboxes'
    >
      {legend && (
        <legend
          className='fr-fieldset__legend--regular fr-fieldset__legend'
          id='checkboxes-legend'
        >
          {legend}
        </legend>
      )}
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`fr-fieldset__element ml-3 ${
            index !== options.length - 1 ? 'border-bottom-grey pb-3' : ''
          }`}
        >
          <div className='fr-checkbox-group'>
            <input
              aria-describedby={`${option.id}-messages`}
              checked={option.checked}
              id={option.id}
              name={option.id}
              onChange={(e) => onChange?.(option.id, e.target.checked)}
              type='checkbox'
            />
            <label className='fr-label' htmlFor={option.id}>
              {option.label}
            </label>
            <div
              aria-live='assertive'
              className='fr-messages-group'
              id={`${option.id}-messages`}
            />
          </div>
        </div>
      ))}
      <div
        aria-live='assertive'
        className='fr-messages-group'
        id='checkboxes-messages'
      />
    </fieldset>
  );
};

export default CheckboxGroup;
