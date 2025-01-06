import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'unit-testing',
    label: 'Include Unit Tests',
    checked: false,
    onChange: action('onChange'),
  },
};

export const Checked: Story = {
  args: {
    id: 'ci-cd',
    label: 'Enable CI/CD Pipeline',
    checked: true,
    onChange: action('onChange'),
  },
};
