'use client';

import wording from '@/wording';

export default function Notice() {
  return (
    <div className='fr-notice fr-notice--info'>
      <div className='fr-container'>
        <div className='fr-notice__body'>
          <span>
            <span className='fr-notice__title'>
              {wording.components.notice.title}
            </span>
            <span className='ml-2'>
              {wording.components.notice.description}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
