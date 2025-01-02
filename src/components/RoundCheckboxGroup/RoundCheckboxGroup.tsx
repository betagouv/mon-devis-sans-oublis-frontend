'use client';

import { useState } from 'react';

import { Rating } from '@/context';
import wording from '@/wording';

export interface CheckboxOption {
  value: Rating;
}

export interface RoundCheckboxGroupProps {
  onChange: (value: Rating) => void;
  options: CheckboxOption[];
}

const RoundCheckboxGroup: React.FC<RoundCheckboxGroupProps> = ({
  options,
  onChange,
}) => {
  const [selected, setSelected] = useState<Rating | null>(null);

  const handleSelect = (value: Rating) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className='flex gap-6'>
      <span>{wording.components.round_checkbox_group.insufficient}</span>
      {options.map((option) => (
        <label key={option.value} className='flex items-center cursor-pointer'>
          <input
            className='hidden'
            checked={selected === option.value}
            onChange={() => handleSelect(option.value)}
            type='checkbox'
          />
          <span
            className={`h-6 w-6 rounded-full border-blue flex items-center justify-center transition-all ${
              selected === option.value &&
              'bg-[var(--background-contrast-grey-hover)]'
            }`}
          ></span>
        </label>
      ))}
      <span>{wording.components.round_checkbox_group.satisfactory}</span>
    </div>
  );
};

export default RoundCheckboxGroup;
