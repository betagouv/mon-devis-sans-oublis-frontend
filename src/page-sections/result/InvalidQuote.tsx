import {
  Alert,
  AlertType,
  Badge,
  BadgeSize,
  BadgeVariant,
  QuoteErrorCard,
  QuoteStatusLink,
  QuoteStatusType,
} from '@/components';
import { Category, EnrichedErrorDetails } from '@/types';
import wording from '@/wording';

interface InvalidQuoteProps {
  analysisDate: string | null;
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
