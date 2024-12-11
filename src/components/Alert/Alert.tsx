'use client';

import { useState } from 'react';

export interface AlertProps {
  className?: string;
  description: string;
  moreInfo?: string;
}

const Alert: React.FC<AlertProps> = ({ className, description, moreInfo }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={`fr-alert fr-alert--info ${className}`}>
      <p>
        {`${description} `}
        {moreInfo && (
          <>
            {showMore && <span>{`${moreInfo} `}</span>}
            <span
              className='text-[var(--text-default-grey)] cursor-pointer underline'
              onClick={handleToggle}
            >
              {showMore ? 'Voir moins' : 'Voir plus'}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Alert;
