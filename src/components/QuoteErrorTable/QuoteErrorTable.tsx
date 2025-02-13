'use client';

import { useState } from 'react';
import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import Tooltip from '../Tooltip/Tooltip';
import { Category, ErrorDetails, Gestes } from '@/types';
import wording from '@/wording';
import ErrorFeedbacksModal from '../Modal/ErrorFeedbacksModal/ErrorFeedbacksModal';

export interface QuoteErrorTablePropsAdmin {
  category: Category.ADMIN;
  errorDetails: ErrorDetails[];
  onHelpClick: (comment: string, errorDetailsId: string) => void;
}

export interface QuoteErrorTablePropsGestes {
  category: Category.GESTES;
  errorDetails: ErrorDetails[];
  gestes: Gestes[];
  onHelpClick: (comment: string, errorDetailsId: string) => void;
}

export type QuoteErrorTableProps =
  | QuoteErrorTablePropsAdmin
  | QuoteErrorTablePropsGestes;

const QuoteErrorTable: React.FC<QuoteErrorTableProps> = (props) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const filteredAdminErrors = props.errorDetails.filter(
    (error) => error.category === Category.ADMIN
  );

  const isCategoryGestes = props.category === Category.GESTES;
  const filteredGestesErrors = isCategoryGestes
    ? Object.values(
        props.errorDetails
          .filter((error) => error.category === Category.GESTES)
          .reduce<Record<string, ErrorDetails>>((acc, error) => {
            const key = `${error.geste_id}-${error.provided_value}-${error.code}`; // Create a unique key for each error

            if (Category.GESTES in props) {
              const matchingGeste = props.gestes.find(
                (geste) =>
                  geste.id === error.geste_id && // Match by geste_id + intitule (in gestes) === geste_id + provided_value (in errorDetails)
                  geste.intitule === error.provided_value
              );

              // This condition ensures that if there are duplicates, we only keep the ones with `valid: false`
              // If no duplicate exists, the error is stored no matter its valid status
              if (
                !acc[key] ||
                (matchingGeste && matchingGeste.valid === false)
              ) {
                acc[key] = error; // Store the error in the accumulator
              }
            } else {
              // If `gestes` is not in props (meaning it's the "admin" category case), simply add the error
              acc[key] = error;
            }

            return acc; // Return the updated accumulator
          }, {})
      )
    : [];

  const openModal = (id: string) => setOpenModalId(id);
  const closeModal = () => setOpenModalId(null);

  const handleFeedbackSubmit = (comment: string, id: string) => {
    try {
      props.onHelpClick(comment, id);
      closeModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className='overflow-hidden rounded-lg border-shadow'>
      <table className='w-full'>
        <caption className='bg-[var(--background-action-low-blue-france)] font-bold text-left p-4 flex items-center justify-between'>
          <span className='flex gap-2 items-center'>
            <p className='fr-mb-0 text-[var(--text-default-grey)]!'>
              {isCategoryGestes
                ? wording.components.quote_error_card.title_gestes
                : wording.components.quote_error_card.title_admin}
            </p>
            {isCategoryGestes && (
              <p className='fr-mb-0 font-normal! text-sm!'>
                {`${(props.gestes.length > 1
                  ? wording.components.quote_error_card
                      .title_gestes_number_plural
                  : wording.components.quote_error_card.title_gestes_number
                ).replace('{number}', props.gestes.length.toString())}`}
              </p>
            )}
            <Tooltip
              icon={wording.components.quote_error_card.tooltip.icon}
              text={
                isCategoryGestes
                  ? wording.components.quote_error_card.tooltip.gestes
                  : wording.components.quote_error_card.tooltip.admin
              }
            />
          </span>
          <Badge
            className='self-center inline-block'
            label={`${((
              isCategoryGestes
                ? filteredGestesErrors.length > 1
                : filteredAdminErrors.length > 1
            )
              ? wording.page_upload_id.badge_correction_plural
              : wording.page_upload_id.badge_correction
            ).replace(
              '{number}',
              isCategoryGestes
                ? filteredGestesErrors.length.toString()
                : filteredAdminErrors.length.toString()
            )}`}
            size={BadgeSize.X_SMALL}
            variant={BadgeVariant.GREY}
          />
        </caption>
        {isCategoryGestes ? (
          props.gestes.map((geste, gIndex) => {
            const errorsForGeste = filteredGestesErrors.filter(
              (error) => error.geste_id === geste.id
            );
            const isFirstGeste = gIndex === 0;
            const isLastGeste = gIndex === props.gestes.length - 1;

            return (
              <tbody key={geste.id}>
                <tr
                  className={`bg-[var(--background-default-grey-hover)] ${
                    isLastGeste && errorsForGeste.length === 0
                      ? 'border-b-0'
                      : `border-bottom-grey ${
                          isFirstGeste ? '' : 'border-top-grey'
                        }`
                  }`}
                >
                  <th
                    className='flex gap-4 justify-between items-center p-4 text-[var(--text-action-high-blue-france)] text-left'
                    scope='row'
                    style={{ fontWeight: 500 }}
                  >
                    {geste.intitule}
                    {geste.valid ? (
                      <Badge
                        icon='fr-icon-success-fill'
                        label={'OK'}
                        size={BadgeSize.X_SMALL}
                        variant={BadgeVariant.GREEN}
                      />
                    ) : (
                      <Badge
                        icon='fr-icon-alert-fill'
                        label={`${errorsForGeste.length}`}
                        size={BadgeSize.X_SMALL}
                        variant={BadgeVariant.ORANGE_LIGHT}
                      />
                    )}
                  </th>
                </tr>
                {errorsForGeste.map((error, index) => {
                  const isLastErrorInTable =
                    isLastGeste && index === errorsForGeste.length - 1;

                  return (
                    <tr
                      className={`font-bold ${
                        isLastErrorInTable
                          ? 'border-b-0'
                          : 'border-bottom-grey border-top-grey'
                      }`}
                      key={error.id}
                    >
                      <td className='flex flex-col md:flex-row justify-between items-start md:items:center gap-4 p-4'>
                        {error.title}
                        {error.solution && (
                          <button
                            className='fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
                            onClick={() => openModal(error.id)}
                          >
                            {
                              wording.components.quote_error_card
                                .button_see_detail
                            }
                          </button>
                        )}
                        {error.solution && (
                          <ErrorFeedbacksModal
                            isOpen={openModalId === error.id}
                            onClose={closeModal}
                            onSubmitFeedback={handleFeedbackSubmit}
                            errorDetailsId={error.id}
                            problem={error.problem || ''}
                            solution={error.solution}
                            title={error.title}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })
        ) : (
          <tbody>
            {filteredAdminErrors.map((error, index) => {
              const isFirstMention = index === 0;

              return (
                <tr
                  className={`font-bold ${
                    index === filteredAdminErrors.length - 1
                      ? 'border-b-0'
                      : `border-bottom-grey ${
                          isFirstMention ? '' : 'border-top-grey'
                        }`
                  }`}
                  key={error.id}
                >
                  <td className='flex justify-between items-center p-4'>
                    {error.title}
                    {error.solution && (
                      <button
                        className='fr-btn fr-btn--tertiary fr-btn--sm shrink-0'
                        onClick={() => openModal(error.id)}
                      >
                        {wording.components.quote_error_card.button_see_detail}
                      </button>
                    )}
                    {error.solution && (
                      <ErrorFeedbacksModal
                        errorDetailsId={error.id}
                        isOpen={openModalId === error.id}
                        onClose={closeModal}
                        onSubmitFeedback={props.onHelpClick}
                        problem={error.problem || ''}
                        solution={error.solution}
                        title={error.title}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default QuoteErrorTable;
