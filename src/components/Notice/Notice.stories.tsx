import type { Meta, StoryObj } from '@storybook/react';

import Notice, { NoticeProps, NoticeType } from './Notice';

const meta: Meta<typeof Notice> = {
  title: 'Components/Notice',
  component: Notice,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: Object.values(NoticeType),
    },
    buttonClose: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<NoticeProps>;

export const Alert: Story = {
  args: {
    type: NoticeType.ALERT,
    title: 'Attention',
    description: "Ceci est un message d'alerte important",
    buttonClose: true,
  },
};

export const Info: Story = {
  args: {
    type: NoticeType.INFO,
    title: 'Information',
    description: "Ceci est un message d'information",
    buttonClose: false,
  },
};
