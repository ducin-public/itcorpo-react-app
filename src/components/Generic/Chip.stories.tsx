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
    children: 'React Developer',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'React Developer',
  }
};

export const Fills: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip fill="SOLID" messageType="DEFAULT">Frontend Dev</Chip>
      <Chip fill="GRADIENT" messageType="DEFAULT">Backend Dev</Chip>
      <Chip fill="OUTLINED" messageType="DEFAULT">DevOps Eng</Chip>
    </div>
  )
};

export const MessageTypes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip messageType="DEFAULT">Available</Chip>
      <Chip messageType="SUCCESS">Deployed</Chip>
      <Chip messageType="WARNING">Needs Review</Chip>
      <Chip messageType="ALERT">Build Failed</Chip>
      <Chip messageType="UPDATE">Updated</Chip>
      <Chip messageType="ACCENT">Featured</Chip>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="SMALL">Junior Dev</Chip>
      <Chip size="MEDIUM">Regular Dev</Chip>
      <Chip size="LARGE">Senior Dev</Chip>
    </div>
  )
};

export const GradientMessageTypes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip fill="GRADIENT" messageType="DEFAULT">Cloud Stack</Chip>
      <Chip fill="GRADIENT" messageType="SUCCESS">Tests Passed</Chip>
      <Chip fill="GRADIENT" messageType="WARNING">High Load</Chip>
      <Chip fill="GRADIENT" messageType="ALERT">Critical Bug</Chip>
      <Chip fill="GRADIENT" messageType="UPDATE">New Release</Chip>
    </div>
  )
};

export const Clickable: Story = {
  args: {
    children: 'Select Technology',
    onClick: action('chip-clicked')
  }
};

export const ClickableList: Story = {
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
      onClick={action('chip-clicked')}
    />
  )
};

export const Removable: Story = {
  args: {
    children: 'TypeScript',
    icon: X,
    onRemove: action('chip-removed')
  }
};

export const RemovableList: Story = {
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
    />
  )
};

export const AllCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="SMALL" fill="SOLID" messageType="DEFAULT">Small Default</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="SUCCESS">Small Success</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="WARNING">Small Warning</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="ALERT">Small Alert</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="UPDATE">Small Update</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="ACCENT">Small Accent</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="SMALL" fill="GRADIENT" messageType="DEFAULT">Small Default</Chip>
          <Chip size="SMALL" fill="GRADIENT" messageType="SUCCESS">Small Success</Chip>
          <Chip size="SMALL" fill="GRADIENT" messageType="WARNING">Small Warning</Chip>
          <Chip size="SMALL" fill="GRADIENT" messageType="ALERT">Small Alert</Chip>
          <Chip size="SMALL" fill="GRADIENT" messageType="UPDATE">Small Update</Chip>
          <Chip size="SMALL" fill="GRADIENT" messageType="ACCENT">Small Accent</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="SMALL" fill="OUTLINED" messageType="DEFAULT">Small Default</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="SUCCESS">Small Success</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="WARNING">Small Warning</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="ALERT">Small Alert</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="UPDATE">Small Update</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="ACCENT">Small Accent</Chip>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="SOLID" messageType="DEFAULT">Medium Default</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="SUCCESS">Medium Success</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="WARNING">Medium Warning</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="ALERT">Medium Alert</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="UPDATE">Medium Update</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="ACCENT">Medium Accent</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="GRADIENT" messageType="DEFAULT">Medium Default</Chip>
          <Chip size="MEDIUM" fill="GRADIENT" messageType="SUCCESS">Medium Success</Chip>
          <Chip size="MEDIUM" fill="GRADIENT" messageType="WARNING">Medium Warning</Chip>
          <Chip size="MEDIUM" fill="GRADIENT" messageType="ALERT">Medium Alert</Chip>
          <Chip size="MEDIUM" fill="GRADIENT" messageType="UPDATE">Medium Update</Chip>
          <Chip size="MEDIUM" fill="GRADIENT" messageType="ACCENT">Medium Accent</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="OUTLINED" messageType="DEFAULT">Medium Default</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="SUCCESS">Medium Success</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="WARNING">Medium Warning</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="ALERT">Medium Alert</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="UPDATE">Medium Update</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="ACCENT">Medium Accent</Chip>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="LARGE" fill="SOLID" messageType="DEFAULT">Large Default</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="SUCCESS">Large Success</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="WARNING">Large Warning</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="ALERT">Large Alert</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="UPDATE">Large Update</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="ACCENT">Large Accent</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="LARGE" fill="GRADIENT" messageType="DEFAULT">Large Default</Chip>
          <Chip size="LARGE" fill="GRADIENT" messageType="SUCCESS">Large Success</Chip>
          <Chip size="LARGE" fill="GRADIENT" messageType="WARNING">Large Warning</Chip>
          <Chip size="LARGE" fill="GRADIENT" messageType="ALERT">Large Alert</Chip>
          <Chip size="LARGE" fill="GRADIENT" messageType="UPDATE">Large Update</Chip>
          <Chip size="LARGE" fill="GRADIENT" messageType="ACCENT">Large Accent</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="LARGE" fill="OUTLINED" messageType="DEFAULT">Large Default</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="SUCCESS">Large Success</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="WARNING">Large Warning</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="ALERT">Large Alert</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="UPDATE">Large Update</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="ACCENT">Large Accent</Chip>
        </div>
      </div>
    </div>
  )
};
