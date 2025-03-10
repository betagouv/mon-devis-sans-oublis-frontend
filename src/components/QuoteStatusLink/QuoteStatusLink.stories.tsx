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
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof QuoteStatusLink>;

export const QuoteLinkShare: Story = {
  args: {
    type: QuoteStatusType.SHARE,
    baseUrl: 'https://example.com',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/conseiller/televersement/123',
      },
    },
  },
};

export const QuoteLinkShareConseillerEdit: Story = {
  args: {
    type: QuoteStatusType.SHARE,
    baseUrl: 'https://example.com',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/conseiller/televersement/123/modifier',
      },
    },
  },
};

export const QuoteLinkUpload: Story = {
  args: {
    type: QuoteStatusType.UPLOAD,
    baseUrl: 'https://example.com',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/conseiller/televersement/123',
      },
    },
  },
};

export const QuoteLinkUploadConseillerEdit: Story = {
  args: {
    type: QuoteStatusType.UPLOAD,
    baseUrl: 'https://example.com',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/conseiller/televersement/123/modifier',
      },
    },
  },
};
