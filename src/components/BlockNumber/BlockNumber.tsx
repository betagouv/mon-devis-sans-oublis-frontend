import React from 'react';

export interface BlockNumberProps {
  className?: string;
  description: string;
  number: number;
  title: string;
}

const BlockNumber: React.FC<BlockNumberProps> = ({
  className,
  description,
  number,
  title,
}) => {
  return (
    <div className={className}>
      <h2 className='fr-display--sm fr-m-0'>{number}</h2>
      <h5 className='fr-mb-1w'>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default BlockNumber;
