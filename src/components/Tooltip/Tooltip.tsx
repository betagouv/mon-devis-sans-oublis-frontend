'use client';

import { useState } from 'react';

export interface TooltipProps {
  className?: string;
  icon: string;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className, icon, text }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const onMouseEnter = () => {
    setShowTooltip(true);
  };

  const onMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <span
        aria-hidden='true'
        className={`cursor-pointer ${icon}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {showTooltip && (
        <p
          className={`fr-text--xs bg-[var(--background-default-grey)] shadow-lg w-[383px] p-2 ${className}`}
        >
          {text}
        </p>
      )}
    </>
  );
};

export default Tooltip;
