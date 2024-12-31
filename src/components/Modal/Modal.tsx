'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface IssueResolution {
  description: string | null;
  title: string;
}

export interface ModalProps {
  buttonBackText: string;
  buttonContactHref: string;
  buttonContactText: string;
  correctionHelpful: string;
  iconAlt: string;
  iconSrc: string;
  isOpen: boolean;
  onClose?: () => void;
  onSubmitFeedback?: (comment: string, isHelpful: boolean) => void;
  problem: IssueResolution;
  solution: IssueResolution;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  buttonBackText,
  buttonContactHref,
  buttonContactText,
  correctionHelpful,
  iconAlt,
  iconSrc,
  isOpen,
  onClose,
  onSubmitFeedback,
  problem,
  solution,
  title,
}) => {
  const [activeButton, setActiveButton] = useState<boolean | null>(null);
  const [comment, setComment] = useState<string>('');
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
        setActiveButton(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleFeedbackClick = (isHelpful: boolean) => {
    setActiveButton(activeButton === isHelpful ? null : isHelpful);
  };

  const handleSubmit = () => {
    if (activeButton && onSubmitFeedback) {
      onSubmitFeedback(comment, activeButton);
      setActiveButton(null);
      setComment('');
    }
  };

  return (
    <>
      {shouldRender && (
        <div
          data-testid='modal-overlay'
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={onClose}
        >
          <div
            data-testid='modal-content'
            className={`flex flex-col px-8 py-4 bg-[var(--background-default-grey)] h-full max-w-md transform transition-transform duration-300 ease-in-out w-[480px] ${
              visibleClass ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
            role='dialog'
          >
            <div>
              <button
                className='fr-link fr-link--lg fr-icon-arrow-left-line fr-link--icon-left mt-6 text-[var(--border-plain-grey)]'
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
                  <button
                    className={`fr-btn fr-btn--tertiary fr-icon-thumb-up-line ${
                      activeButton === true
                        ? 'bg-[var(--background-alt-grey)]'
                        : 'text-[var(--text-title-blue-france)]'
                    }`}
                    data-testid='thumbs-up-button'
                    onClick={() => handleFeedbackClick(true)}
                  />

                  <button
                    className={`fr-btn fr-btn--tertiary fr-icon-thumb-down-line ${
                      activeButton === false
                        ? 'bg-[var(--background-alt-grey)]'
                        : 'text-[var(--text-title-blue-france)]'
                    }`}
                    data-testid='thumbs-down-button'
                    onClick={() => handleFeedbackClick(false)}
                  />
                </span>
              </span>
              {activeButton !== null && (
                <div
                  className='fr-input-group mt-4 flex flex-col'
                  id='input-group-160'
                >
                  <label className='fr-label' htmlFor='storybook-input'>
                    Aidez-nous à améliorer cette correction en nous partageant
                    votre avis (optionnel) :
                  </label>
                  <textarea
                    aria-describedby='storybook-input-messages'
                    className='fr-input'
                    id='storybook-input'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <div
                    className='fr-messages-group'
                    id='storybook-input-messages'
                    aria-live='polite'
                  />
                  <button
                    className='fr-btn fr-btn--primary self-end mt-4'
                    onClick={handleSubmit}
                  >
                    Envoyer ma réponse
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
