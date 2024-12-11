import type { Meta, StoryObj } from '@storybook/react';
import Link, { LinkVariant } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL the link points to',
    },
    label: {
      control: 'text',
      description: 'The text content of the link',
    },
    icon: {
      control: 'text',
      description: 'Optional icon class to be displayed',
    },
    variant: {
      control: 'select',
      options: Object.values(LinkVariant),
      description: 'The visual style variant of the link',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: {
    href: '/example',
    label: 'Primary Link',
    variant: LinkVariant.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: 'Secondary Link',
    variant: LinkVariant.SECONDARY,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    ...Primary.args,
    label: 'Primary with Icon',
    icon: 'fr-icon-arrow-right-line',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    ...Secondary.args,
    label: 'Secondary with Icon',
    icon: 'fr-icon-arrow-right-line',
  },
};
