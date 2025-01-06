import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PhoneInput } from './PhoneInput';

const meta = {
  title: 'UI/Forms/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: '',
    label: 'Phone Number',
    onChange: action('onChange'),
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: '123456789',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
