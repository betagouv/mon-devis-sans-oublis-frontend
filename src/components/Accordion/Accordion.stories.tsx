import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Example Accordion Title',
    children: <div className='p-4'>This is the accordion content</div>,
  },
};

export const WithBadge: Story = {
  args: {
    title:
      'This is a very long title that should be truncated with some commas, and hyphens - to test the truncation logic properly',
    badgeLabel: '5',
    children: (
      <div className='p-4'>This is the accordion content with a long title</div>
    ),
  },
};

export const WithComplexContent: Story = {
  args: {
    title: 'Accordion with Complex Content',
    children: (
      <div className='p-4'>
        <h4>Complex Content</h4>
        <p>
          This accordion contains more complex content with multiple elements.
        </p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>
    ),
  },
};
