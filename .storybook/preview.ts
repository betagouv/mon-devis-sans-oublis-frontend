import type { Preview } from '@storybook/react';

import '@gouvfr/dsfr/dist/dsfr.min.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
