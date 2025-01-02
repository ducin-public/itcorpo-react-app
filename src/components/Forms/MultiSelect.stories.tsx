import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'UI/Forms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[300px]">{Story()}</div>],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Technologies: Story = {
  args: {
    label: "Technologies",
    options: [
      { label: 'React', value: 'react' },
      { label: 'Node.js', value: 'nodejs' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
    ],
    placeholder: "Select technologies...",
    value: [],
    onChange: action('onChange'),
  },
};

export const ProjectTypes: Story = {
  args: {
    label: "Project Categories",
    options: [
      { label: 'Frontend Development', value: 'frontend' },
      { label: 'Backend Services', value: 'backend' },
      { label: 'DevOps', value: 'devops' },
      { label: 'Cloud Infrastructure', value: 'cloud' },
      { label: 'Data Engineering', value: 'data' },
    ],
    placeholder: "Select project types...",
    value: [],
    onChange: action('onChange'),
  },
};

export const Departments: Story = {
  args: {
    label: "Department Access",
    options: [
      { label: 'Development Team', value: 'dev' },
      { label: 'QA Department', value: 'qa' },
      { label: 'DevOps Team', value: 'devops' },
      { label: 'Project Management', value: 'pm' },
      { label: 'Security Team', value: 'security' },
    ],
    placeholder: "Select departments...",
    value: [],
    onChange: action('onChange'),
  },
};

export const WithPreselectedValues: Story = {
  args: {
    label: "Required Skills",
    options: [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Node.js', value: 'nodejs' },
      { label: 'AWS', value: 'aws' },
      { label: 'Docker', value: 'docker' },
    ],
    value: ['react', 'typescript'],
    onChange: action('onChange'),
    placeholder: "Select required skills...",
  },
};

export const Empty: Story = {
  args: {
    label: "No Options",
    options: [],
    value: [],
    onChange: action('onChange'),
    placeholder: "No options available",
  },
};
