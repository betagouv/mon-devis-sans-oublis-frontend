'use client';

import {
  Badge,
  BadgeSize,
  BadgeVariant,
  QuoteErrorCard,
  QuoteStatusCard,
  QuoteStatusLink,
  QuoteStatusVariant,
} from '@/components';
import { useDataContext } from '@/context';
import wording from '@/wording';

export default function Devis() {
  const { data } = useDataContext();

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

  const list = [
    {
      id: 1,
      title: 'Le terme “devis” doit être indiqué clairement',
      info: 'Information manquante',
      infoIcon: 'fr-icon-warning-line',
      modalContent: {
        ...commonModalContent,
        problem: {
          ...commonModalContent.problem,
          description:
            'Nous n’avons pas trouvé le terme “devis”, or les bons de commande et les propositions commerciales ne sont pas acceptées',
        },
        solution: {
          ...commonModalContent.solution,
          description: 'Ajoutez le terme “devis” au document.',
        },
        isOpen: false,

        title: 'Le terme “devis” doit être indiqué clairement',
      },
    },
    {
      id: 2,
      title: 'Il manque votre n° de SIRET (14 chiffres)',
      info: 'Information erronée',
      infoIcon: 'fr-icon-edit-circle-line',
      modalContent: {
        ...commonModalContent,
        problem: {
          ...commonModalContent.problem,
          description: 'Le numéro SIRET est manquant ou incorrect.',
        },
        solution: {
          ...commonModalContent.solution,
          description: 'Ajoutez un numéro SIRET valide (14 chiffres).',
        },
        isOpen: false,
        title: 'Détails pour le n° de SIRET',
      },
    },
  ];

  return (
    <>
      {data?.status}
      <section className='fr-container-fluid fr-py-10w'>
        <div className='fr-container fr-gap-8'>
          <div className='fr-grid-row'>
            <h1>{wording.upload_id.title}</h1>
            <ul className='fr-raw-list fr-badges-group fr-mb-3w flex flex-wrap gap-4 ml-8 self-center'>
              <li>
                <Badge
                  label='Nom du fichier du devis'
                  size={BadgeSize.SMALL}
                  variant={BadgeVariant.BLUE_DARK}
                />
              </li>
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
            <div className='fr-col-12'>
              <QuoteStatusCard
                description={wording.upload_id.quote_status_card_ok.description}
                descriptionOKMore={
                  wording.upload_id.quote_status_card_ok.description_ok_more
                }
                imageAlt={wording.upload_id.quote_status_card_ok.image_alt}
                imageSrc={wording.upload_id.quote_status_card_ok.image_src}
                title={wording.upload_id.quote_status_card_ok.title}
              />
              <QuoteStatusLink
                className='mb-16 mt-8'
                imageAlt={wording.upload_id.quote_status_link_ok.image_alt}
                imageSrc={wording.upload_id.quote_status_link_ok.image_src}
                title={wording.upload_id.quote_status_link_ok.title}
                linkHref={wording.upload_id.quote_status_link_ok.link_href}
                linkLabel={wording.upload_id.quote_status_link_ok.link_label}
                variant={QuoteStatusVariant.SECONDARY}
              />
              <QuoteErrorCard list={list} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
