import { Meta, StoryObj } from '@storybook/react';
import { ErrorBox } from './ErrorBox';

const meta: Meta<typeof ErrorBox> = {
  title: 'UI/Atoms/ErrorBox',
  component: ErrorBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof ErrorBox>;

export const Default: Story = {
  args: {
    label: 'Error',
    message: 'Something went wrong.',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Custom Error',
    message: 'This is a custom error message.',
  },
};

export const WithoutMessage: Story = {
  args: {
    label: 'Error',
  },
};

export const WithCustomIcon: Story = {
  args: {
    label: 'Error',
    message: 'Something went wrong.',
    icon: <div className="w-6 h-6 bg-red-500" />,
  },
};
