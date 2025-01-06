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
      <Chip fill="OUTLINED" messageType="DEFAULT">Backend Dev</Chip>
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

export const Variants: Story = {
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
          <Chip size="SMALL" fill="SOLID" messageType="DEFAULT">In Progress</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="SUCCESS">Deployed</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="WARNING">Code Review</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="ALERT">Critical Bug</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="UPDATE">Sprint 2.3</Chip>
          <Chip size="SMALL" fill="SOLID" messageType="ACCENT">Priority</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="SMALL" fill="OUTLINED" messageType="DEFAULT">Backend</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="SUCCESS">Merged</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="WARNING">Pending</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="ALERT">Blocked</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="UPDATE">v2.0.0</Chip>
          <Chip size="SMALL" fill="OUTLINED" messageType="ACCENT">Epic</Chip>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="SOLID" messageType="DEFAULT">Development</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="SUCCESS">Production</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="WARNING">Testing</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="ALERT">Incident</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="UPDATE">Milestone</Chip>
          <Chip size="MEDIUM" fill="SOLID" messageType="ACCENT">Innovation</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="OUTLINED" messageType="DEFAULT">TypeScript</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="SUCCESS">CI/CD</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="WARNING">Technical Debt</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="ALERT">Regression</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="UPDATE">Backlog</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" messageType="ACCENT">Architecture</Chip>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="LARGE" fill="SOLID" messageType="DEFAULT">Full Stack</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="SUCCESS">Launch Ready</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="WARNING">Performance</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="ALERT">Data Loss</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="UPDATE">Major Update</Chip>
          <Chip size="LARGE" fill="SOLID" messageType="ACCENT">Research</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="LARGE" fill="OUTLINED" messageType="DEFAULT">Infrastructure</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="SUCCESS">Automation</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="WARNING">Maintenance</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="ALERT">Security Risk</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="UPDATE">Integration</Chip>
          <Chip size="LARGE" fill="OUTLINED" messageType="ACCENT">Architecture</Chip>
        </div>
      </div>
    </div>
  )
};
