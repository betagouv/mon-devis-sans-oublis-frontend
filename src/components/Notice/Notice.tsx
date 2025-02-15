'use client';

import { useState } from 'react';

import wording from '@/wording';

export enum NoticeType {
  ALERT = 'alert',
  INFO = 'info',
}

export interface NoticeProps {
  buttonClose?: boolean;
  className?: string;
  description: string;
  title?: string;
  type?: NoticeType;
}

export default function Notice({
  buttonClose = false,
  className,
  description,
  title,
  type,
}: NoticeProps) {
  const [isCloseButtonVisible, setIsCloseButtonVisible] =
    useState<boolean>(true);

  if (!isCloseButtonVisible) return null;

  return (
    <div
      className={`fr-notice ${type ? `fr-notice--${type}` : className} ${
        buttonClose && 'fr-py-1w'
      }`}
    >
      <div className='fr-container'>
        <div className='fr-notice__body'>
          <span>
            <span className='fr-notice__title'>{title}</span>
            <span className='ml-0 md:ml-2 text-sm md:text-base'>
              {description}
            </span>
          </span>
          {buttonClose && (
            <button
              className='fr-btn--close fr-btn'
              onClick={() => setIsCloseButtonVisible(false)}
              title={wording.components.notice.button_close}
              type='button'
            >
              {wording.components.notice.button_close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
