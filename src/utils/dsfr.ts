// Import of the main styles from the DSFR
import '@gouvfr/dsfr/dist/dsfr.min.css';

// DSFR initialization
export async function initDsfr() {
  if (typeof window !== 'undefined') {
    await import('@gouvfr/dsfr/dist/dsfr.module.min.js');
  }
}
