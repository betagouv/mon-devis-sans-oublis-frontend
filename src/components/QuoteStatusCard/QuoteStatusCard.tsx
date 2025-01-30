import Image from 'next/image';

export interface QuoteStatusCardProps {
  description: string;
  descriptionKOMore?: string;
  descriptionOKMore?: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
}

const QuoteStatusCard: React.FC<QuoteStatusCardProps> = ({
  description,
  descriptionKOMore,
  descriptionOKMore,
  imageSrc,
  imageAlt,
  title,
}) => {
  const descriptionOK = descriptionOKMore && (
    <p className='font-bold! text-(--text-title-blue-france)! mb-8 md:mb-0'>
      {descriptionOKMore}
    </p>
  );

  return (
    <div className='fr-container bg-[var(--background-alt-blue-france)] rounded-lg bg-alt-blue flex flex-col md:flex-row justify-between gap-4 w-full'>
      <div className='flex flex-col pt-6 md:pt-12 pb-0 md:pb-12'>
        <h2 className='mb-2'>{title}</h2>
        <p className='mb-2'>{description}</p>
        {descriptionKOMore && <p>{descriptionKOMore}</p>}
        <div className='md:hidden mt-3 mb-3 md:mb-6 w-full h-[140px] relative flex items-center justify-center'>
          <Image
            alt={imageAlt}
            className='object-contain'
            src={imageSrc}
            width={299}
            height={140}
          />
        </div>
        <div className='hidden md:block'>{descriptionOK}</div>
      </div>
      <div className='hidden md:block self-center'>
        <Image alt={imageAlt} height={160} src={imageSrc} width={299} />
      </div>
      <div className='block md:hidden'>{descriptionOK}</div>
    </div>
  );
};

export default QuoteStatusCard;
