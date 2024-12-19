export enum BlockNumberSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface BlockNumberProps {
  className?: string;
  description?: string;
  number: number;
  size?: BlockNumberSize;
  title: string;
}

const BlockNumber: React.FC<BlockNumberProps> = ({
  className,
  description,
  number,
  size = BlockNumberSize.LARGE,
  title,
}) => {
  return (
    // <div className='border-open-blue rounded-lg p-4 w-[325px]'>
    <div className={className}>
      {size === BlockNumberSize.MEDIUM ? (
        <>
          <h1 className='fr-m-0 text-[var(--text-title-blue-france)]'>
            {number}
          </h1>
          <h6 className='fr-mb-1w'>{title}</h6>
        </>
      ) : (
        <>
          <h3 className='fr-display--sm fr-m-0'>{number}</h3>
          <h5 className='fr-mb-1w'>{title}</h5>
        </>
      )}

      {description && <p className='hidden md:block'>{description}</p>}
    </div>
  );
};

export default BlockNumber;
