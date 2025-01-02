import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { X } from 'lucide-react';

import { Chip } from './Chip';
import { ChipList } from './ChipList';

const meta = {
  title: 'UI/Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Chip Text',
    variant: 'PRIMARY'
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'React Developer',
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip variant="PRIMARY">Frontend</Chip>
      <Chip variant="SECONDARY">Backend</Chip>
      <Chip variant="OUTLINED">DevOps</Chip>
      <Chip variant="WARNING">High Priority</Chip>
      <Chip variant="ERROR">Blocked</Chip>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="SMALL">Junior</Chip>
      <Chip size="MEDIUM">Regular</Chip>
      <Chip size="LARGE">Senior</Chip>
    </div>
  )
};

export const Interactive: Story = {
  args: {
    children: 'Select Technology',
    onClick: action('chip-clicked')
  }
};

export const Removable: Story = {
  args: {
    children: 'TypeScript',
    icon: X,
    onRemove: action('chip-removed')
  }
};

export const ChipListExample: Story = {
  render: () => (
    <ChipList
      items={[
        'React',
        'TypeScript',
        'Node.js',
        'Docker',
        'Kubernetes'
      ]}
      icon={X}
      onRemove={action('chip-removed')}
      onClick={action('chip-clicked')}
    />
  )
};
