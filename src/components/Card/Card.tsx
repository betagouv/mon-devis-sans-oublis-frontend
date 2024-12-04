import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Card.module.css';

export interface CardProps {
  alt: string;
  className?: string;
  description: string;
  image: string;
  title: string;
  url: string;
}

const Card: React.FC<CardProps> = ({
  alt,
  className,
  description,
  image,
  title,
  url,
}) => {
  return (
    <div className={`${styles['fr-col']} ${className}`}>
      <div className={`fr-card ${styles['fr-card']} fr-enlarge-link`}>
        <div className='fr-card__body'>
          <div className='fr-card__content'>
            <p
              className={`fr-card__title ${styles['fr-card__title']} fr-text--lead`}
            >
              <Link href={url}>
                <span>{title}</span>
              </Link>
            </p>
            <p className='fr-card__desc'>{description}</p>
          </div>
        </div>
        <div className='fr-card__header fr-ml-4w fr-mt-3w'>
          <div>
            <Image
              alt={alt}
              className={styles['fr-responsive-img']}
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

export default Card;
