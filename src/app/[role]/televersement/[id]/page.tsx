'use client';

import React from 'react';
import {
  Badge,
  BadgeSize,
  BadgeVariant,
  BlockNumber,
  BlockNumberSize,
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
    <div className='fr-container-fluid fr-py-10w'>
      <section className='fr-container fr-gap-8'>
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
            {data?.status === 'valid' && (
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
            {data?.status === 'invalid' && (
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
            {data?.status === 'valid' && data.profile === 'artisan' && (
              <QuoteStatusLink
                className='mb-16 mt-8'
                imageAlt={wording.upload_id.quote_status_link_ok.image_alt}
                imageSrc={wording.upload_id.quote_status_link_ok.image_src}
                title={wording.upload_id.quote_status_link_ok.title}
                linkHref={wording.upload_id.quote_status_link_ok.link_href}
                linkLabel={wording.upload_id.quote_status_link_ok.link_label}
                variant={QuoteStatusVariant.SECONDARY}
              />
            )}
            <ul className='fr-raw-list fr-mx-1w my-8 w-full flex justify-between items-center'>
              {wording.upload_id.block_number.map((block, index) => (
                <React.Fragment key={block.number}>
                  <li className='fr-col-auto flex items-center'>
                    <BlockNumber
                      className='border-open-blue rounded-lg p-4 w-full md:w-[325px]' // Utilisation de classes responsive
                      number={block.number}
                      size={BlockNumberSize.MEDIUM}
                      title={block.title}
                    />
                  </li>
                  {index < wording.upload_id.block_number.length - 1 && (
                    <div className='flex items-center h-full'>
                      <span
                        className='fr-icon-arrow-right-circle-fill text-[var(--text-title-blue-france)]'
                        aria-hidden='true'
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='fr-container'>
        <h2 className='text-[var(--text-title-grey)] fr-mt-1w'>
          Pas de panique, voici les corrections à apporter ⬇️
        </h2>
        <QuoteErrorCard list={list} />
      </section>
    </div>
  );
}
