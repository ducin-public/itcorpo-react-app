import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DateRangePicker } from './DateRangePicker';
import type { DateRange } from 'react-day-picker';
import { Text } from '../Typography/Text';

const meta: Meta = {
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
  args: {
    selected: {
      from: undefined,
      to: undefined
    },
    onSelect: action('date selected'),
  }
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 1))
const TOMORROW = new Date(new Date().setDate(new Date().getDate() + 1))

const Template = (args: Story['args']) => {
  const [selected, setSelected] = useState<DateRange>(args?.selected);
  
  const handleSelect = (range: DateRange) => {
    setSelected(range);
    action('date range selected')(range);
  };

  return <DateRangePicker
    {...args}
    selected={selected}
    onSelect={handleSelect}
  />;
};

export const Default: Story = {
  render: Template,
};

export const WithSelectedDate: Story = {
  render: Template,
  args: {
    selected: {
      from: new Date(2024, 0, 15),
      to: new Date(2024, 0, 29),
    },
  },
};

export const WithFooter: Story = {
  render: Template,
  args: {
    footer: <Text>Please select a date</Text>
  },
};

export const DisabledAll: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const WithDisabledFixedDates: Story = {
  render: Template,
  args: {
    disabled: [YESTERDAY, TOMORROW]
  },
};

export const WithDisabledRange: Story = {
  render: Template,
  args: {
    disabled: { before: YESTERDAY }
  },
};
