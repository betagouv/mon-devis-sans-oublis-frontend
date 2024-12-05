'use client';

import { useBreakpoint } from '@/hooks';

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
  const breakpoint = useBreakpoint();

  return (
    <div className={className}>
      <h3 className='fr-display--sm fr-m-0'>{number}</h3>
      <h5 className='fr-mb-1w'>{title}</h5>
      {breakpoint !== 'XS' && breakpoint !== 'SM' ? <p>{description}</p> : null}
    </div>
  );
};

export default BlockNumber;
