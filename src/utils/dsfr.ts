// Import of the main styles from the DSFR
import '@gouvfr/dsfr/dist/dsfr.min.css';

// Initialize the DSFR library if running in a browser environment
export async function initDsfr() {
  if (typeof window !== 'undefined') {
    await import('@gouvfr/dsfr/dist/dsfr.module.min.js');
  }
}
