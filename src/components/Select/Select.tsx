export interface SelectProps {
  label: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  selectedValue?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  onChange,
  options,
  selectedValue,
}) => {
  return (
    <div className='fr-select-group'>
      <label className='fr-label' htmlFor='select'>
        {label}
      </label>
      <select
        className='fr-select'
        disabled // to change
        id='select'
        onChange={(e) => onChange(e.target.value)}
        name='select'
        value={selectedValue}
      >
        <option value='' disabled hidden>
          Sélectionner une option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
