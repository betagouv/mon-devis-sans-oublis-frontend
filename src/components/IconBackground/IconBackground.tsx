import React from 'react';

import styles from './IconBackground.module.css';

export interface IconBackgroundProps {
  icon: string;
}

const IconBackground: React.FC<IconBackgroundProps> = ({ icon }) => {
  return <div className={`${icon} ${styles.icon} content-center`}></div>;
};

export default IconBackground;
