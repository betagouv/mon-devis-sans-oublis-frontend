// Import main styles from the DSFR
import '@gouvfr/dsfr/dist/dsfr.min.css';
// Import icons from the DSFR
import '@gouvfr/dsfr/dist/utility/icons/icons-others/icons-others.min.css';
// For icon : fr-icon-recycle-fill
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css';
// For icons : fr-icon-arrow-right-line, fr-icon-account-line, fr-icon-mail-line, fr-icon-question-line

// Initialize the DSFR library if running in a browser environment
export async function initDsfr() {
  if (typeof window !== 'undefined') {
    await Promise.all([
      import('@gouvfr/dsfr/dist/dsfr.module.min.js'),
      import('@gouvfr/dsfr/dist/dsfr.nomodule.min.js'),
    ]);
  }
}
