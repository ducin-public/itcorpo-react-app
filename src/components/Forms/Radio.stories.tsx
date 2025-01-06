import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    id: 'frontend',
    name: 'project-type',
    label: 'Frontend Development',
    value: 'frontend',
    checked: false,
    onChange: action('onChange'),
  },
};

export const Checked: Story = {
  args: {
    id: 'backend',
    name: 'project-type',
    label: 'Backend Development',
    value: 'backend',
    checked: true,
    onChange: action('onChange'),
  },
};
