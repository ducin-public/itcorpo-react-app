import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'UI/Forms/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: action('onChange'),
    required: true,
  }
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    label: 'Password',
  },
};

export const WithValue: Story = {
  args: {
    value: 'secretpassword123',
    label: 'Password',
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const ConfirmPassword: Story = {
  args: {
    value: '',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
};
