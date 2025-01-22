'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useIsDesktop } from '@/hooks';

export enum ModalPosition {
  CENTER = 'center',
  RIGHT = 'right',
}

export interface ModalProps {
  backButtonLabel: string;
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  position: ModalPosition;
}

const Modal: React.FC<ModalProps> = ({
  backButtonLabel,
  children,
  className,
  isOpen,
  onClose,
  position,
}) => {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [visibleClass, setVisibleClass] = useState<boolean>(false);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    setMounted(true);
    const element = document.createElement('div');
    element.setAttribute('id', 'modal-root');
    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      if (element && document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, []);

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

  const modalContent = shouldRender && (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${
        position === ModalPosition.CENTER
          ? 'flex items-center justify-center'
          : 'flex items-center justify-end'
      } ${className}`}
      data-testid='modal-overlay'
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className={`flex flex-col px-8 py-4 bg-[var(--background-default-grey)] transform transition-transform duration-300 ease-in-out ${
          position === ModalPosition.CENTER
            ? 'w-[792px] h-[624px]'
            : `${isDesktop ? 'w-[480px]' : 'w-full'}`
        } 
            ${
              position === ModalPosition.CENTER
                ? `rounded-lg ${
                    visibleClass
                      ? 'scale-100 opacity-100'
                      : 'scale-95 opacity-0'
                  }`
                : `h-full ${
                    visibleClass ? 'translate-x-0' : 'translate-x-full'
                  }`
            }`}
        data-testid='modal-content'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
      >
        <div
          className={
            position === ModalPosition.CENTER
              ? 'flex justify-end fr-mb-4w'
              : 'flex justify-start'
          }
        >
          <button
            className={`fr-link ${
              position === ModalPosition.RIGHT
                ? 'fr-link--lg fr-icon-arrow-left-line fr-link--icon-left mt-6 text-[var(--border-plain-grey)]'
                : 'fr-link--sm fr-link--icon-right fr-icon-close-line mt-2'
            }`}
            onClick={onClose}
          >
            <span
              className={`${
                position === ModalPosition.RIGHT
                  ? 'text-[20px] ml-2.5 font-bold text-[var(--text-disabled-grey)]'
                  : 'font-[500]'
              }`}
            >
              {backButtonLabel}
            </span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  if (!mounted || !portalElement) return null;

  return createPortal(modalContent, portalElement);
};

export default Modal;
