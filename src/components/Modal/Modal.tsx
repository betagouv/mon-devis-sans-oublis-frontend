'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface IssueResolution {
  description: string;
  title: string;
}

export interface ModalProps {
  buttonBackText: string;
  buttonContactText: string;
  correctionHelpful: string;
  iconAlt: string;
  iconSrc: string;
  isOpen: boolean;
  onClose?: () => void;
  problem: IssueResolution;
  solution: IssueResolution;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  buttonBackText,
  buttonContactText,
  correctionHelpful,
  iconAlt,
  iconSrc,
  isOpen,
  onClose,
  problem,
  solution,
  title,
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [visibleClass, setVisibleClass] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setVisibleClass(true);
      }, 10);
    } else {
      setVisibleClass(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {shouldRender && (
        <div
          className='fixed inset-0 flex items-center justify-end bg-black bg-opacity-50'
          onClick={onClose}
          style={{ zIndex: 100 }}
        >
          <div
            className={`flex flex-col px-8 py-4 bg-[var(--background-default-grey)] h-full max-w-md transform transition-transform duration-300 ease-in-out w-[480px] ${
              visibleClass ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
            role='dialog'
          >
            <div>
              <button
                className='fr-link fr-link--lg fr-icon-arrow-left-line fr-link--icon-left mt-6'
                onClick={onClose}
              >
                <span className='text-[20px] ml-2.5 font-bold text-[var(--text-disabled-grey)]'>
                  {buttonBackText}
                </span>
              </button>
            </div>
            <div className='flex-grow'>
              <Image
                alt={iconAlt}
                className='mt-10'
                height={64}
                src={iconSrc}
                width={64}
              />
              <h4 className='mb-8'>{title}</h4>
              {problem.description && (
                <>
                  <p className='fr-mb-1w fr-text--lead text-[var(--text-title-blue-france)] font-bold'>
                    {problem.title}
                  </p>
                  <p>{problem.description}</p>
                </>
              )}
              {solution.description && (
                <>
                  <p className='fr-mb-1w fr-mt-3w fr-text--lead text-[var(--text-title-blue-france)] font-bold'>
                    {solution.title}
                  </p>
                  <p>{solution.description}</p>
                </>
              )}
            </div>
            <div className='mb-8'>
              <p className='font-bold fr-mb-1w text-[var(--text-title-grey)]'>
                {correctionHelpful}
              </p>
              <span className='flex justify-between'>
                <span className='flex gap-2'>
                  <button className='fr-btn fr-btn--tertiary fr-icon-thumb-up-line text-[var(--text-title-blue-france)]'></button>
                  <button className='fr-btn fr-btn--tertiary fr-icon-thumb-down-line text-[var(--text-title-blue-france)]'></button>
                </span>
                <button className='fr-btn fr-icon-mail-line fr-btn--icon-right fr-btn--tertiary'>
                  {buttonContactText}
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
