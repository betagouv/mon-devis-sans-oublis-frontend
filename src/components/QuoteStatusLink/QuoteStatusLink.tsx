'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Link, { LinkSize, LinkVariant } from '../Link/Link';
import { useConseillerRoutes, useGoBackToUpload } from '@/hooks';
import wording from '@/wording';

export enum QuoteStatusType {
  SHARE = 'share',
  UPLOAD = 'upload',
}

export interface QuoteStatusLinkProps {
  baseUrl?: string;
  className?: string;
  type: QuoteStatusType;
}

const QuoteStatusLink: React.FC<QuoteStatusLinkProps> = ({
  baseUrl = window.location.origin,
  className,
  type,
}) => {
  const pathname = usePathname();
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);

  const goBackToUpload = useGoBackToUpload();
  const { isConseillerAndEdit } = useConseillerRoutes();

  const nonEditionPath = pathname.replace(/\/modifier$/, '');

  const copyUrlToClipboard = () => {
    const fullUrl = isConseillerAndEdit
      ? `${baseUrl}${nonEditionPath}`
      : `${baseUrl}${pathname}`;

    navigator.clipboard.writeText(fullUrl);
    setIsUrlCopied(true);
  };

  const share = type === QuoteStatusType.SHARE && (
    <div className='flex flex-col'>
      <h5 className='fr-mb-1w'>
        {wording.components.quote_status_link.share.title}
      </h5>
      <p className='fr-mb-2w'>
        {isConseillerAndEdit
          ? 'Retrouvez cette page avec les corrections à apporter sur le devis ainsi que celles que vous avez suggérées'
          : wording.components.quote_status_link.share.description}
      </p>
      <span className='flex flex-row gap-4'>
        <button
          className={`fr-btn ${
            isUrlCopied && 'fr-btn--secondary'
          } fr-btn--sm shrink-0 self-start fr-btn--icon-right ${
            isUrlCopied ? 'fr-icon-check-line' : 'fr-icon-share-box-line'
          }`}
          onClick={copyUrlToClipboard}
        >
          {isUrlCopied
            ? wording.components.quote_status_link.share.button_copied_url
            : wording.components.quote_status_link.share.button_copy_url}
        </button>
      </span>
    </div>
  );

  const upload = type === QuoteStatusType.UPLOAD && (
    <div className='flex flex-col'>
      <h6 className='fr-mb-1w'>
        {isConseillerAndEdit
          ? wording.components.quote_status_link.upload.title_conseiller
          : wording.components.quote_status_link.upload.title}
      </h6>
      <Link
        href={goBackToUpload}
        label={wording.components.quote_status_link.upload.link_label}
        legacyBehavior
        size={LinkSize.SMALL}
        variant={LinkVariant.SECONDARY}
      />
    </div>
  );

  return (
    <div
      className={`${
        type === QuoteStatusType.SHARE
          ? 'bg-[var(--background-alt-blue-france)]'
          : 'bg-[var(--background-default-grey-hover)]'
      } border-shadow flex items-center gap-6 px-4 py-6 rounded-lg w-fit ${className}`}
    >
      <Image
        alt={
          type === QuoteStatusType.SHARE
            ? wording.components.quote_status_link.share.image_alt
            : wording.components.quote_status_link.upload.image_alt
        }
        className='shrink-0'
        height={80}
        src={
          type === QuoteStatusType.SHARE
            ? wording.components.quote_status_link.share.image_src
            : wording.components.quote_status_link.upload.image_src
        }
        width={80}
      />
      {share}
      {upload}
    </div>
  );
};

export default QuoteStatusLink;
