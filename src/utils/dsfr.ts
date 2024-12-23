// Import main styles from the DSFR
import '@gouvfr/dsfr/dist/dsfr.min.css';

// Import icons from the DSFR
import '@gouvfr/dsfr/dist/utility/icons/icons-business/icons-business.min.css';
// fr-icon-calendar-event-line,fr-icon-mail-line
import '@gouvfr/dsfr/dist/utility/icons/icons-document/icons-document.min.css';
// fr-icon-file-download-line
import '@gouvfr/dsfr/dist/utility/icons/icons-media/icons-media.min.css';
// fr-icon-headphone-fill
import '@gouvfr/dsfr/dist/utility/icons/icons-others/icons-others.min.css';
// fr-icon-recycle-fill
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css';
// fr-icon-account-line, fr-icon-arrow-right-line, fr-icon-check-line, fr-icon-information-fill, fr-icon-question-line, fr-icon-time-line

// Initialize the DSFR library if running in a browser environment
export async function initDsfr() {
  if (typeof window !== 'undefined') {
    await Promise.all([
      import('@gouvfr/dsfr/dist/dsfr.module.min.js'),
      import('@gouvfr/dsfr/dist/dsfr.nomodule.min.js'),
    ]);
  }
}
