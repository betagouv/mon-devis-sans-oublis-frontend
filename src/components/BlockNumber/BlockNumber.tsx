export enum BlockNumberSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface BlockNumberProps {
  className?: string;
  description?: string;
  number: number;
  size?: BlockNumberSize;
  title: React.ReactNode;
}

const BlockNumber: React.FC<BlockNumberProps> = ({
  className,
  description,
  number,
  size = BlockNumberSize.LARGE,
  title,
}) => {
  return (
    <div className={className}>
      {size === BlockNumberSize.MEDIUM ? (
        <div className='flex flex-row md:flex-col md:gap-0 gap-4 md:items-start items-center'>
          <h1 className='fr-m-0 text-[var(--text-title-blue-france)]'>
            {number}
          </h1>
          <h5 className='fr-mb-1w fr-mt-1w md:fr-mb-0 md:fr-mt-0'>{title}</h5>
        </div>
      ) : (
        <div className='flex flex-row gap-4'>
          <h5 className='text-[40px] text-[var(--text-title-blue-france)]'>
            {`${number}.`}
          </h5>
          <p style={{ marginTop: '-8px' }}>{title}</p>
        </div>
      )}

      {description && <p className='hidden md:block'>{description}</p>}
    </div>
  );
};

export default BlockNumber;
