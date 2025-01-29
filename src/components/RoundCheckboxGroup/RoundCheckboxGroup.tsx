'use client';

import { useState } from 'react';

import { Rating } from '@/types';
import wording from '@/wording';

export interface CheckboxOption {
  value: Rating;
}

export interface RoundCheckboxGroupProps {
  defaultValue?: Rating;
  onChange: (value: Rating) => void;
  options: CheckboxOption[];
}

const RoundCheckboxGroup: React.FC<RoundCheckboxGroupProps> = ({
  defaultValue,
  options,
  onChange,
}) => {
  const [selected, setSelected] = useState<Rating | null>(defaultValue || null);

  const handleSelect = (value: Rating) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className='flex gap-6'>
      <span>{wording.components.round_checkbox_group.insufficient}</span>
      {options.map((option) => (
        <label className='flex items-center cursor-pointer' key={option.value}>
          <input
            checked={selected === option.value}
            className='hidden'
            onChange={() => handleSelect(option.value)}
            type='checkbox'
          />
          <span className='h-6 w-6 rounded-full border-blue flex items-center justify-center transition-all'>
            {selected === option.value && (
              <div className='bg-[var(--background-action-high-blue-france)] h-3 w-3 rounded-full' />
            )}
          </span>
        </label>
      ))}
      <span>{wording.components.round_checkbox_group.satisfactory}</span>
    </div>
  );
};

export default RoundCheckboxGroup;
