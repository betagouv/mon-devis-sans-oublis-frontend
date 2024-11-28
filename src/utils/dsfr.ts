// Import main styles from the DSFR
import '@gouvfr/dsfr/dist/dsfr.min.css';
// Import icons from the DSFR
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css';

// Initialize the DSFR library if running in a browser environment
export async function initDsfr() {
  if (typeof window !== 'undefined') {
    await import('@gouvfr/dsfr/dist/dsfr.module.min.js');
  }
}
