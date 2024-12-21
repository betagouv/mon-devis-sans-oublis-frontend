'use client';

import { useState } from 'react';

import wording from '@/wording';

export interface AlertProps {
  className?: string;
  description: string;
  moreDescription?: string;
}

const Alert: React.FC<AlertProps> = ({
  className,
  description,
  moreDescription,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={`fr-alert fr-alert--info ${className}`}>
      <p>
        {`${description} `}
        {moreDescription && (
          <>
            {showMore && <span>{`${moreDescription} `}</span>}
            <span
              className='text-[var(--text-default-grey)] cursor-pointer underline'
              onClick={handleToggle}
            >
              {showMore
                ? wording.components.alert.see_less
                : wording.components.alert.see_more}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Alert;
