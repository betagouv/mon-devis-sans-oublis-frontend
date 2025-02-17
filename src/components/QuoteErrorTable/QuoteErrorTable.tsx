'use client';

import Badge, { BadgeSize, BadgeVariant } from '../Badge/Badge';
import QuoteErrorLine from '../QuoteErrorLine/QuoteErrorLine';
import Tooltip from '../Tooltip/Tooltip';
import {
  Category,
  ErrorDetails,
  ErrorDetailsDeletionReasons,
  Gestes,
} from '@/types';
import wording from '@/wording';

export interface QuoteErrorTablePropsAdmin {
  category: Category.ADMIN;
  deleteErrorReasons?: { id: string; label: string }[];
  errorDetails: ErrorDetails[];
  onDeleteError?: (
    quoteCheckId: string,
    errorDetailsId: string,
    reason?: keyof ErrorDetailsDeletionReasons | string
  ) => void;
  onHelpClick: (comment: string, errorDetailsId: string) => void;
  quoteCheckId: string;
}

export interface QuoteErrorTablePropsGestes {
  category: Category.GESTES;
  deleteErrorReasons?: { id: string; label: string }[];
  errorDetails: ErrorDetails[];
  gestes: Gestes[];
  onDeleteError?: (
    errorDetailsId: string,
    quoteCheckId: string,
    reason?: keyof ErrorDetailsDeletionReasons | string
  ) => void;
  onHelpClick: (comment: string, errorDetailsId: string) => void;
  quoteCheckId: string;
}

export type QuoteErrorTableProps =
  | QuoteErrorTablePropsAdmin
  | QuoteErrorTablePropsGestes;

const QuoteErrorTable: React.FC<QuoteErrorTableProps> = (props) => {
  const isCategoryAdmin = props.category === Category.ADMIN;

  const isCategoryGestes = props.category === Category.GESTES;
  const gestes =
    isCategoryGestes && 'gestes' in props ? props.gestes ?? [] : [];

  const filteredGestesErrors = isCategoryGestes
    ? Object.values(
        props.errorDetails
          .filter((error) => error.category === Category.GESTES)
          .reduce<Record<string, ErrorDetails>>((acc, error) => {
            const key = `${error.geste_id}-${error.provided_value}-${error.code}`;

            if (Category.GESTES in props) {
              const matchingGeste = props.gestes.find(
                (geste) =>
                  geste.id === error.geste_id &&
                  geste.intitule === error.provided_value
              );

              if (
                !acc[key] ||
                (matchingGeste && matchingGeste.valid === false)
              ) {
                acc[key] = error;
              }
            } else {
              acc[key] = error;
            }

            return acc;
          }, {})
      )
    : [];

  console.log(
    '🖥️ Liste des erreurs mises à jour après suppression:',
    props.errorDetails
  );

  return (
    <div className='overflow-hidden rounded-lg border-shadow'>
      <table className='w-full'>
        <caption className='bg-[var(--background-action-low-blue-france)] font-bold text-left p-4 flex items-center justify-between'>
          <span className='flex gap-2 items-center'>
            <p className='fr-mb-0 text-[var(--text-default-grey)]!'>
              {isCategoryGestes &&
                wording.components.quote_error_card.title_gestes}
              {isCategoryAdmin &&
                wording.components.quote_error_card.title_admin}
            </p>
            {isCategoryGestes && gestes.length > 0 && (
              <p className='fr-mb-0 font-normal! text-sm!'>
                {`${(gestes.length > 1
                  ? wording.components.quote_error_card
                      .title_gestes_number_plural
                  : wording.components.quote_error_card.title_gestes_number
                ).replace('{number}', gestes.length.toString())}`}
              </p>
            )}
            <Tooltip
              icon={wording.components.quote_error_card.tooltip.icon}
              text={
                isCategoryGestes
                  ? wording.components.quote_error_card.tooltip.gestes
                  : isCategoryAdmin
                  ? wording.components.quote_error_card.tooltip.admin
                  : ''
              }
            />
          </span>
          <Badge
            className='self-center inline-block'
            label={`${((
              isCategoryGestes
                ? filteredGestesErrors.filter((error) =>
                    gestes.some(
                      (geste) => geste.id === error.geste_id && !geste.valid
                    )
                  ).length > 1
                : props.errorDetails.length > 1
            )
              ? wording.page_upload_id.badge_correction_plural
              : wording.page_upload_id.badge_correction
            ).replace(
              '{number}',
              (isCategoryGestes
                ? filteredGestesErrors.filter((error) =>
                    gestes.some(
                      (geste) => geste.id === error.geste_id && !geste.valid
                    )
                  ).length
                : props.errorDetails.length
              ).toString()
            )}`}
            size={BadgeSize.X_SMALL}
            variant={BadgeVariant.GREY}
          />
        </caption>
        {isCategoryGestes && gestes.length > 0
          ? props.gestes.map((geste, gIndex) => {
              const errorsForGeste = filteredGestesErrors.filter(
                (error) => error.geste_id === geste.id
              );
              const isLastGeste = gIndex === props.gestes.length - 1;

              return (
                <tbody key={geste.id}>
                  <tr
                    className={`bg-[var(--background-default-grey-hover)] ${
                      isLastGeste && errorsForGeste.length === 0
                        ? 'border-b-0'
                        : `border-bottom-grey ${
                            gIndex === 0 ? '' : 'border-top-grey'
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
                  {errorsForGeste.map((error, index) => (
                    <QuoteErrorLine
                      deleteErrorReasons={props.deleteErrorReasons}
                      error={error}
                      isLastErrorInTable={
                        isLastGeste && index === errorsForGeste.length - 1
                      }
                      key={error.id}
                      onDeleteError={props.onDeleteError}
                      onFeedbackSubmit={props.onHelpClick}
                      quoteCheckId={props.quoteCheckId}
                    />
                  ))}
                </tbody>
              );
            })
          : null}
        {isCategoryAdmin ? (
          <tbody>
            {props.errorDetails
              .filter((error) => error.category === Category.ADMIN)
              .map((error) => (
                <QuoteErrorLine
                  deleteErrorReasons={props.deleteErrorReasons}
                  error={error}
                  key={error.id}
                  onDeleteError={props.onDeleteError}
                  onFeedbackSubmit={props.onHelpClick}
                  quoteCheckId={props.quoteCheckId}
                />
              ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
};

export default QuoteErrorTable;
