import React from 'react';

import {
  Badge,
  BadgeSize,
  BadgeVariant,
  BlockNumber,
  BlockNumberSize,
  Link,
  LinkSize,
  LinkVariant,
  QuoteErrorCard,
  QuoteStatusCard,
  QuoteStatusLink,
  QuoteStatusType,
} from '@/components';
import { useGoBackToUpload } from '@/hooks';
import { Category, EnrichedErrorDetails } from '@/types';
import wording from '@/wording';

interface InvalidQuoteProps {
  analysisDate: string;
  list: EnrichedErrorDetails[];
  onHelpClick: (
    comment: string | null,
    errorDetailsId: string
  ) => Promise<void>;
  uploadedFileName: string;
}

export default function InvalidQuote({
  analysisDate,
  list,
  onHelpClick,
  uploadedFileName,
}: InvalidQuoteProps) {
  const goBackToUpload = useGoBackToUpload();

  const errorDetails = (
    errors: EnrichedErrorDetails[] | null = [],
    category: Category
  ) => {
    return (errors || [])
      .filter((error) => error.category === category)
      .map((error) => ({
        id: error.id,
        geste_id: error.geste_id,
        category: error.category,
        type: error.type,
        code: error.code,
        title: error.title,
        problem: error.problem || null,
        solution: error.solution || null,
        provided_value: error.provided_value || null,
        modalContent: {
          problem: error.problem || null,
          solution: error.solution || null,
          isOpen: false,
          title: error.title,
        },
      }));
  };

  const adminErrors = errorDetails(list, Category.ADMIN);
  const gestesErrors = errorDetails(list, Category.GESTES);

  return (
    <>
      <section className='fr-container fr-gap-8'>
        <span className='flex flex-col md:flex-row items-center justify-between fr-mb-2w'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col md:flex-row flex-wrap gap-4 items-center'>
              <h1 className='mb-0! text-center md:text-left'>
                {wording.upload_id.title}
              </h1>
            </div>
          </div>
          <p className='bg-[var(--background-default-grey-hover)] mt-2! md:mt-0! mb-0! p-2 rounded-sm text-sm!'>
            {`Analyse du ${analysisDate}`}
          </p>
        </span>
        <div className='flex flex-col items-center md:items-start'>
          <div className='flex flex-wrap gap-4 fr-mb-4w justify-center md:justify-start'>
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
        <div className='fr-col-12'>
          <QuoteStatusCard
            description={wording.upload_id.quotation_status_card_ko.description}
            imageAlt={wording.upload_id.quotation_status_card_ko.image_alt}
            imageSrc={wording.upload_id.quotation_status_card_ko.image_src}
            title={wording.upload_id.quotation_status_card_ko.title}
          />
          <ul className='fr-raw-list my-8! w-full flex flex-col gap-6 md:flex-row md:justify-between md:items-center'>
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
                              href={goBackToUpload}
                              label={
                                wording.components.quote_status_link.upload
                                  .link_label
                              }
                              legacyBehavior
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
                        <QuoteErrorCard
                          list={adminErrors}
                          onHelpClick={onHelpClick}
                        />
                      )}
                      {gestesErrors.length > 0 && (
                        <QuoteErrorCard
                          list={gestesErrors}
                          onHelpClick={onHelpClick}
                        />
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
        </div>
      </section>
      <section className='fr-container hidden md:block'>
        <h2 className='text-[var(--text-title-grey)] fr-mt-1w'>
          {wording.upload_id.subtitle}
        </h2>
        <div className='flex flex-col gap-8'>
          {adminErrors.length > 0 && (
            <QuoteErrorCard list={adminErrors} onHelpClick={onHelpClick} />
          )}
          {gestesErrors.length > 0 && (
            <QuoteErrorCard list={gestesErrors} onHelpClick={onHelpClick} />
          )}
        </div>
      </section>
      <section className='fr-container fr-my-6w'>
        <div className='flex md:flex-row flex-col gap-4 justify-between'>
          <QuoteStatusLink type={QuoteStatusType.SHARE} />
          <QuoteStatusLink
            className='md:w-[480px]!'
            type={QuoteStatusType.UPLOAD}
          />
        </div>
      </section>
    </>
  );
}
