import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'UI/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: null,
    onSelect: action('date selected'),
  },
};

export const WithSelectedDate: Story = {
  args: {
    selected: new Date(2024, 0, 15), // January 15, 2024
    onSelect: action('date selected'),
  },
};

export const Disabled: Story = {
  args: {
    selected: null,
    onSelect: action('date selected'),
    disabled: true,
  },
};

export const WithDisabledDays: Story = {
  args: {
    selected: null,
    onSelect: action('date selected'),
    disabledDays: [
      new Date(2024, 0, 1), // New Year's Day
      new Date(2024, 11, 25), // Christmas
    ],
  },
};

export const WithFooter: Story = {
  args: {
    selected: null,
    onSelect: action('date selected'),
    footer: <p className="text-sm text-gray-500">Please select an appointment date</p>,
  },
};
