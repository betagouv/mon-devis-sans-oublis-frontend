'use client';

import { useState, useRef, useEffect } from 'react';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';

export interface Option {
  id: string;
  label: string;
  group?: string;
}

export interface CustomInput {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export interface MultiSelectCheckboxProps {
  customInput?: {
    id: string;
    value: string;
    onChange: (value: string) => void;
  };
  label: string;
  onChange: (values: string[]) => void;
  optionnal?: boolean;
  options: string[] | Option[];
  selectedValues?: string[];
}

interface GroupedOption {
  id: string;
  label: string | JSX.Element;
  checked: boolean;
  group?: string;
}

interface GroupedOptions {
  [key: string]: GroupedOption[];
}

export const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  customInput,
  label,
  onChange,
  optionnal,
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
    let newValues: string[];
    if (checked) {
      newValues = [...localSelectedValues, id];
    } else {
      newValues = localSelectedValues.filter((value) => value !== id);
      if (id === 'custom' && customInput) {
        customInput.onChange('');
      }
    }
    setLocalSelectedValues(newValues);
    onChange(newValues);
  };

  const handleCustomInputChange = (value: string) => {
    customInput?.onChange(value);
    if (value.trim() && !localSelectedValues.includes('custom')) {
      const newValues = [...localSelectedValues, 'custom'];
      setLocalSelectedValues(newValues);
      onChange(newValues);
    } else if (!value.trim() && localSelectedValues.includes('custom')) {
      const newValues = localSelectedValues.filter((v) => v !== 'custom');
      setLocalSelectedValues(newValues);
      onChange(newValues);
    }
  };

  const normalizeOptions = (opts: string[] | Option[]): Option[] => {
    if (opts.length === 0) return [];
    if (typeof opts[0] === 'string') {
      return (opts as string[]).map((opt) => ({
        id: opt,
        label: opt,
      }));
    }
    return opts as Option[];
  };

  const getDisplayLabel = (id: string): string => {
    if (isGroupedOptions(options)) {
      const option = options.find((opt) => opt.id === id);
      return option?.label || id;
    }
    const normalizedOpts = normalizeOptions(options);
    const option = normalizedOpts.find((opt) => opt.id === id);
    return option?.label?.toString() || id;
  };

  const displayValue = localSelectedValues.length
    ? localSelectedValues.length > 1
      ? `${localSelectedValues.length} sélections`
      : getDisplayLabel(localSelectedValues[0])
    : 'Sélectionner une ou plusieurs options';

  const normalizedOptions = isGroupedOptions(options)
    ? options
    : normalizeOptions(options);

  const checkboxOptions = normalizedOptions.map((option) => ({
    id: option.id,
    label:
      option.id === 'custom' ? (
        <div className='flex-grow'>
          <input
            className='fr-input w-full'
            data-testid='custom-reason-input'
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleCustomInputChange(e.target.value)}
            placeholder='Autre raison'
            value={customInput?.value || ''}
            type='text'
          />
        </div>
      ) : (
        option.label
      ),
    checked: localSelectedValues.includes(option.id),
    group: option.group,
  }));

  const groupedOptions = checkboxOptions.reduce<GroupedOptions>(
    (acc, option) => {
      const group = option.group || 'default';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(option);
      return acc;
    },
    {}
  );

  return (
    <div className='fr-select-group relative fr-mb-4w' ref={containerRef}>
      <label className='fr-label' htmlFor='multiselect'>
        {label}
      </label>
      {optionnal && <div className='fr-hint-text my-2'>Optionnel</div>}
      <button
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className='fr-select text-left'
        id='multiselect'
        onClick={() => setIsOpen(!isOpen)}
        type='button'
      >
        {displayValue}
      </button>
      {isOpen && (
        <div className='fr-select-checkbox border-shadow pt-5 pb-2 pl-2 h-[180px] overflow-x-hidden overflow-y-auto absolute w-full bg-white z-10'>
          {Object.entries(groupedOptions).map(([group, groupOpts]) => (
            <div key={group}>
              {group !== 'default' && (
                <legend className='fr-fieldset__legend'>{group}</legend>
              )}
              <CheckboxGroup
                options={groupOpts}
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCheckbox;
