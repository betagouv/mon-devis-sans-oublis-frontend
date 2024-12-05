import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Style variant of the link',
    },
    icon: {
      control: 'text',
      description: 'Icon class name (optional)',
    },
    href: {
      control: 'text',
      description: 'URL the link points to',
    },
    label: {
      control: 'text',
      description: 'Text content of the link',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: {
    href: '#',
    label: 'Primary Link',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    href: '#',
    label: 'Secondary Link',
    variant: 'secondary',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    href: '#',
    label: 'Link with Icon',
    icon: 'fr-icon-arrow-right-line',
    variant: 'primary',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    href: '#',
    label: 'Secondary Link with Icon',
    icon: 'fr-icon-arrow-right-line',
    variant: 'secondary',
  },
};