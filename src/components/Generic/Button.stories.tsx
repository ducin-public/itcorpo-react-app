import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: action('button-clicked')
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'PRIMARY',
    size: 'MEDIUM',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'SECONDARY',
    size: 'MEDIUM',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'OUTLINED',
    size: 'MEDIUM',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'SMALL',
  },
};

export const Big: Story = {
  args: {
    children: 'Big Button',
    size: 'LARGE',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
};
