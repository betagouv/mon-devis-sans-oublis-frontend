import Image from 'next/image';

import Link, { LinkSize } from '../Link/Link';

export enum QuoteStatusVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface QuoteStatusLinkProps {
  className?: string;
  imageAlt: string;
  imageSrc: string;
  linkHref: string;
  linkLabel: string;
  title: string;
  variant: QuoteStatusVariant;
}

const QuoteStatusLink: React.FC<QuoteStatusLinkProps> = ({
  className,
  imageAlt,
  imageSrc,
  linkHref,
  linkLabel,
  title,
  variant,
}) => {
  const backgroundColor =
    variant === QuoteStatusVariant.PRIMARY
      ? 'bg-[var(--background-alt-blue-france)]'
      : 'bg-[var(--background-default-grey)]';

  return (
    <div
      className={`${backgroundColor} border-shadow flex items-center gap-4 p-8 rounded-lg w-fit ${className}`}
    >
      <Image
        alt={imageAlt}
        className='flex-shrink-0'
        height={80}
        src={imageSrc}
        width={80}
      />
      <div className='flex flex-col'>
        <h6 className='mb-4'>{title}</h6>
        <Link href={linkHref} label={linkLabel} size={LinkSize.SMALL} />
      </div>
    </div>
  );
};

export default QuoteStatusLink;
