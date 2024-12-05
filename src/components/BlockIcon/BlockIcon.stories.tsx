import type { Meta, StoryObj } from '@storybook/react';
import BlockIcon from './BlockIcon';

const meta = {
  title: 'Components/BlockIcon',
  component: BlockIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'DSFR icon class name',
      control: { type: 'text' },
    },
    title: {
      description: 'Title displayed below the icon',
      control: { type: 'text' },
    },
    description: {
      description: 'Description text displayed below the title',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof BlockIcon>;

export default meta;
type Story = StoryObj<typeof BlockIcon>;

export const Default: Story = {
  args: {
    icon: 'fr-icon-user-line',
    title: 'User Profile',
    description: 'Manage your user profile and settings',
  },
};

export const BlockIconGrid: Story = {
  decorators: [
    () => (
      <div className='fr-grid-row fr-grid-row--gutters'>
        <BlockIcon
          description='Manage your profile'
          icon='fr-icon-user-line'
          title='Profile'
        />
        <BlockIcon
          description='View your schedule'
          icon='fr-icon-calendar-line'
          title='Calendar'
        />
        <BlockIcon
          description='Check your inbox'
          icon='fr-icon-mail-line'
          title='Messages'
        />
      </div>
    ),
  ],
};
