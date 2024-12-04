import React from 'react';
import Image from 'next/image';

import styles from './CardImage.module.css';

export interface CardImageProps {
  image: string;
  title: string;
}

const CardImage: React.FC<CardImageProps> = ({ image, title }) => {
  return (
    <div className={styles['card-image']}>
      <Image alt={title} height={120} src={`/images/${image}`} width={120} />
      <h6 className='text-center'>{title}</h6>
    </div>
  );
};

export default CardImage;
