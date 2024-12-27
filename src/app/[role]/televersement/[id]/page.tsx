'use client';

import React, { use, useEffect, useState } from 'react';
import {
  Badge,
  BadgeSize,
  BadgeVariant,
  BlockNumber,
  BlockNumberSize,
  Confetti,
  Link,
  LinkSize,
  LinkVariant,
  QuoteErrorCard,
  QuoteStatusCard,
  QuoteStatusLink,
  QuoteStatusVariant,
} from '@/components';
import {
  Category,
  ErrorDetails,
  QuoteChecksId,
  Status,
  Type,
  useDataContext,
} from '@/context';
import wording from '@/wording';

export default function Devis({
  params: initialParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(initialParams);
  const { data } = useDataContext();

  const [currentDevis, setCurrentDevis] = useState<QuoteChecksId | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUrlCopied, setIsUrlCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchDevis = () => {
      const devis = data.find((devis) => devis.id === params.id);
      setCurrentDevis(devis || null);
      setIsLoading(false);
    };

    fetchDevis();
  }, [data, params.id]);

  if (isLoading) {
    return (
      <section className='fr-container-fluid fr-py-10w'>
        <div className='flex flex-col items-center justify-center'>
          <h1>Chargement du devis...</h1>
        </div>
      </section>
    );
  }

  if (!currentDevis) {
    return null;
  }

  const uploadedFileName = (
    localStorage.getItem('uploadedFileName') || ''
  ).substring(0, 20);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsUrlCopied(true);
  };

  const commonModalContent = {
    buttonBackText: wording.upload_id.modal.button_back_text,
    buttonContactHref: wording.upload_id.modal.button_contact_href,
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

  const list = (currentDevis.error_details || []).map(
    (error: ErrorDetails) => ({
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
    })
  );

  const adminErrors = list.filter((error) => error.category === Category.ADMIN);
  const gestesErrors = list.filter(
    (error) => error.category === Category.GESTES
  );

  return (
    <div className='fr-container-fluid fr-py-10w'>
      {currentDevis?.status === Status.VALID && <Confetti />}
      <section className='fr-container fr-gap-8'>
        <div className='flex flex-col md:flex-row justify-between fr-mb-6w'>
          <div className='flex flex-col md:flex-row flex-wrap gap-4 items-center'>
            <h1 className='mb-0 text-center md:text-left'>
              {wording.upload_id.title}
            </h1>
            <div className='flex flex-wrap gap-4 justify-center'>
              {uploadedFileName && (
                <Badge
                  label={uploadedFileName}
                  size={BadgeSize.SMALL}
                  variant={BadgeVariant.BLUE_DARK}
                />
              )}
              <Badge
                label={(list.length > 1
                  ? wording.upload_id.badge_correction_plural
                  : wording.upload_id.badge_correction
                ).replace('{number}', list.length.toString())}
                size={BadgeSize.SMALL}
                variant={BadgeVariant.GREY}
              />
            </div>
          </div>
          {currentDevis?.status === Status.INVALID && (
            <button
              className={`fr-btn ${
                !isUrlCopied && 'fr-btn--secondary'
              } md:block hidden shrink-0 self-start fr-ml-1w`}
              disabled={isUrlCopied}
              onClick={copyUrlToClipboard}
            >
              {isUrlCopied
                ? wording.upload_id.button_copied_url
                : wording.upload_id.button_copy_url}
              {isUrlCopied && <span className='fr-icon-check-line fr-ml-1w' />}
            </button>
          )}
        </div>
        <div className='fr-col-12'>
          {currentDevis?.status === Status.VALID ? (
            <QuoteStatusCard
              description={wording.upload_id.quote_status_card_ok.description}
              imageAlt={wording.upload_id.quote_status_card_ok.image_alt}
              imageSrc={wording.upload_id.quote_status_card_ok.image_src}
              title={wording.upload_id.quote_status_card_ok.title}
            />
          ) : (
            <QuoteStatusCard
              description={wording.upload_id.quote_status_card_ko.description}
              imageAlt={wording.upload_id.quote_status_card_ko.image_alt}
              imageSrc={wording.upload_id.quote_status_card_ko.image_src}
              title={wording.upload_id.quote_status_card_ko.title}
            />
          )}
          {currentDevis?.status === Status.INVALID && (
            <ul className='fr-raw-list my-8 w-full flex flex-col gap-6 md:flex-row md:justify-between md:items-center'>
              {wording.upload_id.block_number.map((block, index) => (
                <React.Fragment key={block.number}>
                  <li className='fr-col-auto flex items-stretch w-full'>
                    <BlockNumber
                      className='border-open-blue rounded-lg p-4 w-full h-full'
                      number={block.number}
                      size={BlockNumberSize.MEDIUM}
                      title={
                        <>
                          <span className='flex flex-row gap-3'>
                            {block.title}
                            {index === 0 && (
                              <span className='block md:hidden'>⬇️</span>
                            )}
                          </span>
                          {index === 2 && (
                            <span className='block fr-mt-2w md:hidden'>
                              <Link
                                href={
                                  wording.upload_id.quote_status_link_ko
                                    .link_href
                                }
                                label={
                                  wording.upload_id.quote_status_link_ko
                                    .link_label
                                }
                                size={LinkSize.SMALL}
                                variant={LinkVariant.SECONDARY}
                              ></Link>
                            </span>
                          )}
                        </>
                      }
                    />
                  </li>
                  {index === 0 && (
                    <div className='block md:hidden w-full'>
                      <div className='flex flex-col gap-8'>
                        {adminErrors.length > 0 && (
                          <QuoteErrorCard list={adminErrors} />
                        )}
                        {gestesErrors.length > 0 && (
                          <QuoteErrorCard list={gestesErrors} />
                        )}
                      </div>
                    </div>
                  )}
                  {index < wording.upload_id.block_number.length - 1 && (
                    <div className='hidden md:flex items-center h-full'>
                      <span
                        aria-hidden='true'
                        className='fr-icon-arrow-right-circle-fill text-[var(--text-title-blue-france)]'
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </ul>
          )}
        </div>
      </section>
      {currentDevis?.status === Status.INVALID && (
        <section className='fr-container hidden md:block'>
          <h2 className='text-[var(--text-title-grey)] fr-mt-1w'>
            {wording.upload_id.subtitle}
          </h2>
          <div className='flex flex-col gap-8'>
            {adminErrors.length > 0 && <QuoteErrorCard list={adminErrors} />}
            {gestesErrors.length > 0 && <QuoteErrorCard list={gestesErrors} />}
          </div>
        </section>
      )}
      <section className='fr-container fr-mt-10w hidden md:block'>
        {currentDevis?.status === Status.VALID ? (
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
