import {
  Badge,
  BadgeSize,
  BadgeVariant,
  Confetti,
  QuoteStatusCard,
  QuoteStatusLink,
  QuoteStatusType,
} from '@/components';
import wording from '@/wording';

interface ValidQuoteProps {
  analysisDate: string | null;
  uploadedFileName: string;
}

export default function ValidQuote({
  analysisDate,
  uploadedFileName,
}: ValidQuoteProps) {
  return (
    <>
      <Confetti />
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
              {`Analyse du ${analysisDate}`}
            </p>
          )}
        </span>
        <div className='flex gap-4 fr-mb-4w justify-center md:justify-start'>
          {uploadedFileName && (
            <Badge
              label={uploadedFileName}
              size={BadgeSize.SMALL}
              variant={BadgeVariant.BLUE_DARK}
            />
          )}
        </div>
        <div className='fr-col-12'>
          <QuoteStatusCard
            description={
              wording.page_upload_id.quotation_status_card_ok.description
            }
            imageAlt={wording.page_upload_id.quotation_status_card_ok.image_alt}
            imageSrc={wording.page_upload_id.quotation_status_card_ok.image_src}
            title={wording.page_upload_id.quotation_status_card_ok.title}
          />
        </div>
      </section>
      <section className='fr-container fr-mt-10w'>
        <QuoteStatusLink className='mb-16 mt-8' type={QuoteStatusType.UPLOAD} />
      </section>
    </>
  );
}
