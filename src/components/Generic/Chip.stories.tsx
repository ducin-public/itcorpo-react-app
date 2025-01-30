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
      <Chip fill="SOLID" variant="DEFAULT">Frontend Dev</Chip>
      <Chip fill="OUTLINED" variant="DEFAULT">Backend Dev</Chip>
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
      <Chip variant="DEFAULT">Available</Chip>
      <Chip variant="SUCCESS">Deployed</Chip>
      <Chip variant="WARNING">Needs Review</Chip>
      <Chip variant="ALERT">Build Failed</Chip>
      <Chip variant="UPDATE">Updated</Chip>
      <Chip variant="ACCENT">Featured</Chip>
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

export const DisabledList: Story = {
  render: () => (
    <ChipList
      items={['React', 'TypeScript', 'Node.js']}
      disabled
    />
  )
};

export const DisabledInteractiveList: Story = {
  render: () => (
    <ChipList
      items={['React', 'TypeScript', 'Node.js']}
      icon={X}
      onRemove={action('chip-removed')}
      onClick={action('chip-clicked')}
      disabled
    />
  )
};

export const AllCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="SMALL" fill="SOLID" variant="DEFAULT">In Progress</Chip>
          <Chip size="SMALL" fill="SOLID" variant="SUCCESS">Deployed</Chip>
          <Chip size="SMALL" fill="SOLID" variant="WARNING">Code Review</Chip>
          <Chip size="SMALL" fill="SOLID" variant="ALERT">Critical Bug</Chip>
          <Chip size="SMALL" fill="SOLID" variant="UPDATE">Sprint 2.3</Chip>
          <Chip size="SMALL" fill="SOLID" variant="ACCENT">Priority</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="SMALL" fill="OUTLINED" variant="DEFAULT">Backend</Chip>
          <Chip size="SMALL" fill="OUTLINED" variant="SUCCESS">Merged</Chip>
          <Chip size="SMALL" fill="OUTLINED" variant="WARNING">Pending</Chip>
          <Chip size="SMALL" fill="OUTLINED" variant="ALERT">Blocked</Chip>
          <Chip size="SMALL" fill="OUTLINED" variant="UPDATE">v2.0.0</Chip>
          <Chip size="SMALL" fill="OUTLINED" variant="ACCENT">Epic</Chip>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="SOLID" variant="DEFAULT">Development</Chip>
          <Chip size="MEDIUM" fill="SOLID" variant="SUCCESS">Production</Chip>
          <Chip size="MEDIUM" fill="SOLID" variant="WARNING">Testing</Chip>
          <Chip size="MEDIUM" fill="SOLID" variant="ALERT">Incident</Chip>
          <Chip size="MEDIUM" fill="SOLID" variant="UPDATE">Milestone</Chip>
          <Chip size="MEDIUM" fill="SOLID" variant="ACCENT">Innovation</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="MEDIUM" fill="OUTLINED" variant="DEFAULT">TypeScript</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" variant="SUCCESS">CI/CD</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" variant="WARNING">Technical Debt</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" variant="ALERT">Regression</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" variant="UPDATE">Backlog</Chip>
          <Chip size="MEDIUM" fill="OUTLINED" variant="ACCENT">Architecture</Chip>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Chip size="LARGE" fill="SOLID" variant="DEFAULT">Full Stack</Chip>
          <Chip size="LARGE" fill="SOLID" variant="SUCCESS">Launch Ready</Chip>
          <Chip size="LARGE" fill="SOLID" variant="WARNING">Performance</Chip>
          <Chip size="LARGE" fill="SOLID" variant="ALERT">Data Loss</Chip>
          <Chip size="LARGE" fill="SOLID" variant="UPDATE">Major Update</Chip>
          <Chip size="LARGE" fill="SOLID" variant="ACCENT">Research</Chip>
        </div>
        <div className="flex gap-2">
          <Chip size="LARGE" fill="OUTLINED" variant="DEFAULT">Infrastructure</Chip>
          <Chip size="LARGE" fill="OUTLINED" variant="SUCCESS">Automation</Chip>
          <Chip size="LARGE" fill="OUTLINED" variant="WARNING">Maintenance</Chip>
          <Chip size="LARGE" fill="OUTLINED" variant="ALERT">Security Risk</Chip>
          <Chip size="LARGE" fill="OUTLINED" variant="UPDATE">Integration</Chip>
          <Chip size="LARGE" fill="OUTLINED" variant="ACCENT">Architecture</Chip>
        </div>
      </div>
    </div>
  )
};
