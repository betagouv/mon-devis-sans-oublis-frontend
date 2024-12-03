import React from 'react';

import styles from './BlockIcon.module.css';
import IconBackground from '../IconBackground/IconBackground';
export interface BlockIconProps {
  description: string;
  icon: string;
  title: string;
}

const BlockIcon: React.FC<BlockIconProps> = ({ description, icon, title }) => {
  return (
    <div className={styles.container}>
      <IconBackground icon={icon} />
      <h5 className='fr-mt-2w'>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default BlockIcon;
