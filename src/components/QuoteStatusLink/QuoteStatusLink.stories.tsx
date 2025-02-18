import type { Meta, StoryObj } from '@storybook/react';

import QuoteStatusLink, { QuoteStatusType } from './QuoteStatusLink';

const meta: Meta<typeof QuoteStatusLink> = {
  title: 'Components/QuoteStatusLink',
  component: QuoteStatusLink,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: Object.values(QuoteStatusType),
    },
  },
};

export default meta;

type Story = StoryObj<typeof QuoteStatusLink>;

export const QuoteLinkEdit: Story = {
  args: {
    type: QuoteStatusType.EDIT,
  },
};

export const QuoteLinkShare: Story = {
  args: {
    type: QuoteStatusType.SHARE,
  },
};

export const QuoteLinkUpload: Story = {
  args: {
    type: QuoteStatusType.UPLOAD,
  },
};
