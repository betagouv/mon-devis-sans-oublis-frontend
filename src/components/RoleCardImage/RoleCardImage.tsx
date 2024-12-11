import Image from 'next/image';
import Link from 'next/link';

export interface RoleCardImageProps {
  alt: string;
  description: string;
  image: string;
  title: string;
  url: string;
}

const RoleCardImage: React.FC<RoleCardImageProps> = ({
  alt,
  description,
  image,
  title,
  url,
}) => {
  return (
    <div className='fr-col'>
      <div className='fr-card fr-enlarge-link h-full'>
        <div className='fr-card__body'>
          <div className='fr-card__content'>
            <p className='fr-card__title fr-text--lead'>
              <Link href={url}>
                <span className='text-[var(--text-default-grey)]'>{title}</span>
              </Link>
            </p>
            <p className='fr-card__desc'>{description}</p>
          </div>
        </div>
        <div className='fr-card__header fr-ml-4w fr-mt-3w'>
          <div>
            <Image
              alt={alt}
              className='block object-contain object-left self-start h-[80px] w-full'
              height={80}
              src={`/images/${image}`}
              width={102}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCardImage;
