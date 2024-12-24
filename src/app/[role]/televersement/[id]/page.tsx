'use client';

import React, { useEffect, useState } from 'react';
import {
  Badge,
  BadgeSize,
  BadgeVariant,
  BlockNumber,
  BlockNumberSize,
  Confetti,
  QuoteErrorCard,
  QuoteStatusCard,
  QuoteStatusLink,
  QuoteStatusVariant,
} from '@/components';
import {
  Category,
  ErrorDetails,
  Status,
  Type,
  useDataContext,
} from '@/context';
import wording from '@/wording';

export default function Devis() {
  const { data } = useDataContext();
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);

  const commonModalContent = {
    buttonBackText: wording.upload_id.modal.button_back_text,
    buttonContactText: wording.upload_id.modal.button_contact_text,
    correctionHelpful: wording.upload_id.modal.correction_helpful,
    iconAlt: wording.upload_id.modal.icon_alt,
    iconSrc: wording.upload_id.modal.icon_src,
    problem: {
      title: wording.upload_id.modal.problem.title,
    },
    solution: {
      title: wording.upload_id.modal.solution.title,
    },
  };

  const list = ((data?.error_details as ErrorDetails[]) || []).map((error) => ({
    id: error.id,
    category: error.category as Category,
    type: error.type as Type,
    code: error.code,
    title: error.title,
    provided_value: error.provided_value || null,
    modalContent: {
      ...commonModalContent,
      problem: {
        ...commonModalContent.problem,
        description: error.problem || null,
      },
      solution: {
        ...commonModalContent.solution,
        description: error.solution || null,
      },
      isOpen: false,
      title: error.title,
    },
  }));

  const uploadedFileName = (
    localStorage.getItem('uploadedFileName') || ''
  ).substring(0, 20);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
  };

  useEffect(() => {
    const handleClipboardChange = (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData;
      if (clipboardData) {
        const text = clipboardData.getData('text');
        if (text !== window.location.href) {
          setIsUrlCopied(false);
        }
      }
    };

    document.addEventListener('copy', handleClipboardChange);
    return () => {
      document.removeEventListener('copy', handleClipboardChange);
    };
  }, []);

  const adminErrors = list.filter((error) => error.category === Category.ADMIN);
  const gestesErrors = list.filter(
    (error) => error.category === Category.GESTES
  );

  return (
    <div className='fr-container-fluid fr-py-10w'>
      {data?.status === Status.VALID && <Confetti />}
      <section className='fr-container fr-gap-8'>
        <div className='fr-grid-row flex justify-between items-center'>
          <div className='flex items-center'>
            <h1>{wording.upload_id.title}</h1>
            <ul className='fr-raw-list fr-badges-group fr-mb-3w flex flex-wrap gap-4 ml-8 self-center'>
              {uploadedFileName && (
                <li>
                  <Badge
                    label={uploadedFileName}
                    size={BadgeSize.SMALL}
                    variant={BadgeVariant.BLUE_DARK}
                  />
                </li>
              )}
              <li>
                <Badge
                  label={(list.length > 1
                    ? wording.upload_id.badge_correction_plural
                    : wording.upload_id.badge_correction
                  ).replace('{number}', list.length.toString())}
                  size={BadgeSize.SMALL}
                  variant={BadgeVariant.GREY}
                />
              </li>
            </ul>
          </div>
          <button
            className={`fr-btn ${!isUrlCopied && 'fr-btn--secondary'} fr-mb-3w`}
            disabled={isUrlCopied}
            onClick={copyUrlToClipboard}
          >
            {isUrlCopied
              ? wording.upload_id.button_copied_url
              : wording.upload_id.button_copy_url}
            {isUrlCopied && <span className='fr-icon-check-line fr-ml-1w' />}
          </button>
        </div>
        <div className='fr-col-12'>
          {data?.status === Status.VALID && (
            <QuoteStatusCard
              description={wording.upload_id.quote_status_card_ok.description}
              descriptionOKMore={
                wording.upload_id.quote_status_card_ok.description_ok_more
              }
              imageAlt={wording.upload_id.quote_status_card_ok.image_alt}
              imageSrc={wording.upload_id.quote_status_card_ok.image_src}
              title={wording.upload_id.quote_status_card_ok.title}
            />
          )}
          {data?.status === Status.INVALID && (
            <QuoteStatusCard
              description={wording.upload_id.quote_status_card_ko.description}
              descriptionKOMore={
                wording.upload_id.quote_status_card_ko.description_ko_more
              }
              imageAlt={wording.upload_id.quote_status_card_ko.image_alt}
              imageSrc={wording.upload_id.quote_status_card_ko.image_src}
              title={wording.upload_id.quote_status_card_ko.title}
            />
          )}
          <ul className='fr-raw-list fr-mx-1w my-8 w-full flex justify-between items-center'>
            {wording.upload_id.block_number.map((block, index) => (
              <React.Fragment key={block.number}>
                <li className='fr-col-auto flex items-center'>
                  <BlockNumber
                    className='border-open-blue rounded-lg p-4 w-full md:w-[325px]'
                    number={block.number}
                    size={BlockNumberSize.MEDIUM}
                    title={block.title}
                  />
                </li>
                {index < wording.upload_id.block_number.length - 1 && (
                  <div className='flex items-center h-full'>
                    <span
                      aria-hidden='true'
                      className='fr-icon-arrow-right-circle-fill text-[var(--text-title-blue-france)]'
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </section>
      <section className='fr-container'>
        <h2 className='text-[var(--text-title-grey)] fr-mt-1w'>
          {wording.upload_id.subtitle}
        </h2>
        <div className='flex flex-col gap-8'>
          <QuoteErrorCard
            cardTitle='Mentions administratives'
            cardTooltip='Les mentions administratives sont communes à tous les postes de travaux. Elles sont obligatoires pour les obtentions d’aides financières.'
            list={adminErrors}
          />
          <QuoteErrorCard
            cardTitle='Descriptif technique des gestes'
            cardTooltip='Les gestes correspondent aux normes et au matériel des critères techniques. Certaines informations sont à mentionner obligatoirement pour l’obtention des aides.'
            list={gestesErrors}
          />
        </div>
        {data?.status === Status.VALID ? (
          <QuoteStatusLink
            className='mb-16 mt-8'
            imageAlt={wording.upload_id.quote_status_link_ok.image_alt}
            imageSrc={wording.upload_id.quote_status_link_ok.image_src}
            title={wording.upload_id.quote_status_link_ok.title}
            linkHref={wording.upload_id.quote_status_link_ok.link_href}
            linkLabel={wording.upload_id.quote_status_link_ok.link_label}
            variant={QuoteStatusVariant.SECONDARY}
          />
        ) : (
          <QuoteStatusLink
            className='mb-16 mt-8'
            imageAlt={wording.upload_id.quote_status_link_ko.image_alt}
            imageSrc={wording.upload_id.quote_status_link_ko.image_src}
            title={wording.upload_id.quote_status_link_ko.title}
            linkHref={wording.upload_id.quote_status_link_ko.link_href}
            linkLabel={wording.upload_id.quote_status_link_ko.link_label}
            variant={QuoteStatusVariant.PRIMARY}
          />
        )}
      </section>
    </div>
  );
}
