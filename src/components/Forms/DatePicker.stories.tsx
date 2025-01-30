import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DatePicker } from './DatePicker';
import { Text } from '../Typography/Text';
import { useState } from 'react';

const meta = {
  title: 'UI/Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    selected: undefined,
    onSelect: action('date selected'),
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 1))
const TOMORROW = new Date(new Date().setDate(new Date().getDate() + 1))

const Template = (args: Story['args']) => {
  const [selected, setSelected] = useState(args?.selected);
  return <DatePicker
    {...args}
    selected={selected}
    onSelect={setSelected}
  />;
}

export const Default: Story = {
  render: Template,
};

export const WithSelectedDate: Story = {
  render: Template,
  args: {
    selected: new Date(2024, 0, 15),
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
