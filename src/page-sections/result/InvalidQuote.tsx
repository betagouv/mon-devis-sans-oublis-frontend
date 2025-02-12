import {
  Alert,
  AlertType,
  Badge,
  BadgeSize,
  BadgeVariant,
  QuoteErrorTable,
  QuoteStatusLink,
  QuoteStatusType,
} from '@/components';
import { Category, ErrorDetails, Gestes } from '@/types';
import wording from '@/wording';

interface InvalidQuoteProps {
  analysisDate: string | null;
  gestes: Gestes[];
  list: ErrorDetails[];
  onHelpClick: (
    comment: string | null,
    errorDetailsId: string
  ) => Promise<void>;
  uploadedFileName: string;
}

export default function InvalidQuote({
  analysisDate,
  gestes,
  list,
  onHelpClick,
  uploadedFileName,
}: InvalidQuoteProps) {
  return (
    <>
      <section className='fr-container fr-gap-8'>
        <span className='flex flex-col md:flex-row items-center justify-between fr-mb-2w'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col md:flex-row flex-wrap gap-4 items-center'>
              <h1 className='mb-0! text-center md:text-left'>
                {wording.page_upload_id.title}
              </h1>
            </div>
          </div>
          {analysisDate !== null && (
            <p className='bg-[var(--background-default-grey-hover)] mt-2! md:mt-0! mb-0! p-2 rounded-sm text-sm!'>
              {wording.page_upload_id.analysis_date.replace(
                '{date}',
                analysisDate
              )}
            </p>
          )}
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
                ? wording.page_upload_id.badge_correction_plural
                : wording.page_upload_id.badge_correction
              ).replace('{number}', list.length.toString())}
              size={BadgeSize.SMALL}
              variant={BadgeVariant.GREY}
            />
          </div>
        </div>
        <Alert
          className='fr-pr-2w font-bold w-fit'
          description={wording.page_upload_id.quotation_alert_ko}
          type={AlertType.INFO}
        />
      </section>
      <section className='fr-container'>
        <h3 className='fr-mt-6w text-center md:text-left'>
          {wording.page_upload_id.subtitle}
        </h3>
        <div className='flex flex-col gap-8'>
          <QuoteErrorTable
            category={Category.ADMIN}
            errorDetails={list}
            onHelpClick={onHelpClick}
          />
          <QuoteErrorTable
            category={Category.GESTES}
            errorDetails={list}
            gestes={gestes}
            onHelpClick={onHelpClick}
          />
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
