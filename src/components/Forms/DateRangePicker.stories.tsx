import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DateRangePicker } from './DateRangePicker';

const meta = {
  title: 'UI/Forms/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: {
      from: null,
      to: null
    },
    onSelect: action('date range selected')
  },
};

export const WithPreselectedDates: Story = {
  args: {
    selected: {
      from: new Date(2024, 0, 15), // January 15, 2024
      to: new Date(2024, 0, 20), // January 20, 2024
    },
    onSelect: action('date range selected')
  },
};

export const Disabled: Story = {
  args: {
    selected: {
      from: null,
      to: null
    },
    onSelect: action('date range selected'),
    disabled: true
  },
};

export const WithCustomLabels: Story = {
  args: {
    selected: {
      from: null,
      to: null
    },
    onSelect: action('date range selected'),
    fromLabel: 'Treatment Start',
    toLabel: 'Treatment End'
  },
};

export const WithDisabledDays: Story = {
  args: {
    selected: {
      from: null,
      to: null
    },
    onSelect: action('date range selected'),
    disabledDays: [
      new Date(2024, 0, 1), // New Year's Day
      new Date(2024, 11, 25), // Christmas
    ]
  },
};
