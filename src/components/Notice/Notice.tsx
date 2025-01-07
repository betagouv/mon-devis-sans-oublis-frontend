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
            <span>{wording.components.notice.description}</span>
          </span>
          <button
            onClick={() => {
              const notice = document.querySelector('.fr-notice');
              if (notice) {
                notice.parentNode?.removeChild(notice);
              }
            }}
            title={wording.components.notice.button_close}
            type='button'
            className='fr-btn--close fr-btn'
          >
            {wording.components.notice.button_close}
          </button>
        </div>
      </div>
    </div>
  );
}
