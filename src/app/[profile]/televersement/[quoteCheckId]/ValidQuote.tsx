import { usePathname } from 'next/navigation';

import {
  Badge,
  BadgeSize,
  BadgeVariant,
  Confetti,
  QuoteStatusCard,
  QuoteStatusLink,
  QuoteStatusVariant,
} from '@/components';
import wording from '@/wording';

interface ValidQuoteProps {
  uploadedFileName: string;
}

const ValidQuote = ({ uploadedFileName }: ValidQuoteProps) => {
  const pathname = usePathname();
  const goBackToUpload = pathname.split('/').slice(0, 3).join('/');

  return (
    <>
      <Confetti />
      <section className='fr-container fr-gap-8'>
        <div className='flex flex-col md:flex-row justify-between fr-mb-6w'>
          <div className='flex flex-col md:flex-row flex-wrap gap-4 items-center'>
            <h1 className='mb-0 text-center md:text-left'>
              {wording.upload_id.title}
            </h1>
            {uploadedFileName && (
              <Badge
                label={uploadedFileName}
                size={BadgeSize.SMALL}
                variant={BadgeVariant.BLUE_DARK}
              />
            )}
          </div>
        </div>
        <div className='fr-col-12'>
          <QuoteStatusCard
            description={wording.upload_id.quote_status_card_ok.description}
            imageAlt={wording.upload_id.quote_status_card_ok.image_alt}
            imageSrc={wording.upload_id.quote_status_card_ok.image_src}
            title={wording.upload_id.quote_status_card_ok.title}
          />
        </div>
      </section>
      <section className='fr-container fr-mt-10w hidden md:block'>
        <QuoteStatusLink
          className='mb-16 mt-8'
          imageAlt={wording.upload_id.quote_status_link_ok.image_alt}
          imageSrc={wording.upload_id.quote_status_link_ok.image_src}
          linkHref={goBackToUpload}
          linkLabel={wording.upload_id.quote_status_link_ok.link_label}
          title={wording.upload_id.quote_status_link_ok.title}
          variant={QuoteStatusVariant.SECONDARY}
        />
      </section>
    </>
  );
};

export default ValidQuote;
