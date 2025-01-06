import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DateRangePicker } from './DateRangePicker';

const meta = {
  title: 'UI/Forms/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Date range picker component for selecting project timelines, sprint dates, and other corporate date ranges.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProjectTimeline: Story = {
  args: {
    label: 'Project Timeline',
    selected: {
      from: null,
      to: null
    },
    onSelect: action('project dates selected'),
    fromLabel: 'Project Start',
    toLabel: 'Project End'
  },
};

export const SprintDuration: Story = {
  args: {
    selected: {
      from: new Date(2024, 0, 15), // January 15, 2024
      to: new Date(2024, 0, 29), // January 29, 2024
    },
    onSelect: action('sprint dates selected'),
    fromLabel: 'Sprint Start',
    toLabel: 'Sprint End'
  },
};

export const ContractPeriod: Story = {
  args: {
    label: 'Contract Duration',
    selected: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31)
    },
    onSelect: action('contract dates selected')
  },
};

export const DisabledTrainingDates: Story = {
  args: {
    label: 'Training Period',
    selected: {
      from: null,
      to: null
    },
    onSelect: action('training dates selected'),
    disabled: true
  },
};

export const WithCompanyHolidays: Story = {
  args: {
    label: 'Work Period',
    selected: {
      from: null,
      to: null
    },
    onSelect: action('work dates selected'),
    disabledDays: [
      new Date(2024, 0, 1), // New Year's Day
      new Date(2024, 11, 25), // Christmas
      new Date(2024, 11, 26), // Boxing Day
    ],
    fromLabel: 'Start Date',
    toLabel: 'End Date'
  },
};
