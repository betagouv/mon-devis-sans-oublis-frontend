import type { Meta, StoryObj } from '@storybook/react';

import IconBackground from './IconBackground';

const meta = {
  title: 'Components/IconBackground',
  component: IconBackground,

  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon class name to be displayed',
    },
  },
} satisfies Meta<typeof IconBackground>;

export default meta;
type Story = StoryObj<typeof IconBackground>;

export const CalendarIcon: Story = {
  args: {
    icon: 'fr-icon-calendar-line',
  },
};

export const UserIcon: Story = {
  args: {
    icon: 'fr-icon-user-line',
  },
};

export const IconGrid: Story = {
  decorators: [
    () => (
      <div className='fr-grid-row fr-grid-row--gutters'>
        <div className='fr-col-4'>
          <IconBackground icon='fr-icon-user-line' />
        </div>
        <div className='fr-col-4'>
          <IconBackground icon='fr-icon-calendar-line' />
        </div>
        <div className='fr-col-4'>
          <IconBackground icon='fr-icon-mail-line' />
        </div>
      </div>
    ),
  ],
};
