'use client';

import { useState, useRef, useEffect } from 'react';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';

type Option = {
  id: string;
  label: string;
  group: string;
};

export interface MultiSelectCheckboxProps {
  label: string;
  onChange: (values: string[]) => void;
  options: string[] | Option[];
  selectedValues?: string[];
}

export const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  label,
  onChange,
  options,
  selectedValues = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [localSelectedValues, setLocalSelectedValues] =
    useState<string[]>(selectedValues);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isGroupedOptions = (opt: string[] | Option[]): opt is Option[] => {
    return opt.length > 0 && typeof opt[0] === 'object' && 'group' in opt[0];
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const newValues = checked
      ? [...localSelectedValues, id]
      : localSelectedValues.filter((value) => value !== id);
    setLocalSelectedValues(newValues);
    onChange(newValues);
  };

  const simpleOptions = !isGroupedOptions(options)
    ? options.map((opt) => ({
        id: opt,
        label: opt,
        checked: localSelectedValues.includes(opt),
      }))
    : [];

  const groupedOptions = isGroupedOptions(options)
    ? options.reduce((acc, option) => {
        if (!acc[option.group]) {
          acc[option.group] = [];
        }
        acc[option.group].push({
          id: option.id,
          label: option.label,
          checked: localSelectedValues.includes(option.id),
        });
        return acc;
      }, {} as { [key: string]: { id: string; label: string; checked: boolean }[] })
    : {};

  const displayValue = localSelectedValues.length
    ? `${localSelectedValues.length} ${
        localSelectedValues.length > 1 ? 'sélections' : 'sélection'
      }`
    : 'Sélectionner';

  return (
    <div className='fr-select-group relative' ref={containerRef}>
      <label className='fr-label' htmlFor='multiselect'>
        {label}
      </label>
      <button
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className='fr-select'
        id='multiselect'
        onClick={() => setIsOpen(!isOpen)}
        type='button'
      >
        {displayValue}
      </button>
      {isOpen && (
        <div
          className='fr-select-checkbox border-shadow p-4 h-[190px] overflow-x-hidden overflow-y-auto absolute w-full bg-white z-10'
          role='listbox'
        >
          {!isGroupedOptions(options) ? (
            <CheckboxGroup
              onChange={handleCheckboxChange}
              options={simpleOptions}
            />
          ) : (
            Object.entries(groupedOptions).map(([group, groupOptions]) => (
              <div key={group} className='fr-fieldset'>
                <legend className='fr-fieldset__legend'>{group}</legend>
                <CheckboxGroup
                  onChange={handleCheckboxChange}
                  options={groupOptions}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCheckbox;
