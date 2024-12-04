import React from 'react';

import IconBackground from '../IconBackground/IconBackground';

export interface BlockIconProps {
  description: string;
  icon: string;
  title: string;
}

const BlockIcon: React.FC<BlockIconProps> = ({ description, icon, title }) => {
  return (
    <div className='fr-col-md text-center'>
      <div className='content-center'>
        <IconBackground icon={icon} />
      </div>
      <h5 className='fr-mt-2w'>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default BlockIcon;
