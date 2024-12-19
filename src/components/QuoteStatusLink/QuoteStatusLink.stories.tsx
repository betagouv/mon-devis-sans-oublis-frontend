import type { Meta, StoryObj } from '@storybook/react';

import QuoteStatusLink, { QuoteStatusVariant } from './QuoteStatusLink';

const meta: Meta<typeof QuoteStatusLink> = {
  title: 'Components/QuoteStatusLink',
  component: QuoteStatusLink,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: Object.values(QuoteStatusVariant),
    },
  },
};

export default meta;

type Story = StoryObj<typeof QuoteStatusLink>;

export const QuoteLinkOK: Story = {
  args: {
    imageAlt: 'Quote Status',
    imageSrc: '/images/quote_link_ok.png',
    title: 'Revenez quand vous voulez !',
    linkHref: '/quote-status',
    linkLabel: 'Vérifier un nouveau devis',
    variant: QuoteStatusVariant.SECONDARY,
  },
};

export const QuoteLinkKO: Story = {
  args: {
    imageAlt: 'Quote Status',
    imageSrc: '/images/quote_link_ko.png',
    title: 'Psst, c’est bon vous avez tout corrigé ?',
    linkHref: '/analysis-report',
    linkLabel: 'Vérifier à nouveau le devis',
    variant: QuoteStatusVariant.PRIMARY,
  },
};
