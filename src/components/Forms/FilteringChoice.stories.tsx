import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FilteringChoice } from './FilteringChoice';

const meta = {
  title: 'UI/Forms/FilteringChoice',
  component: FilteringChoice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilteringChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'ANY',
    onChange: action('onChange'),
  },
};

export const AllSelected: Story = {
  args: {
    value: 'ALL',
    onChange: action('onChange'),
  },
};

export const WithInteractions: Story = {
  args: {
    value: 'ANY',
    onChange: action('onChange'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter choice between ANY and ALL conditions. Used in contexts like filtering project requirements or office amenities where multiple items can be selected.',
      },
    },
  },
};
