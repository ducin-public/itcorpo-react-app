import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from './Dropdown';

const projectTypes = {
  'WEB': 'Web Development Project',
  'MOBILE': 'Mobile App Development',
  'CLOUD': 'Cloud Infrastructure',
  'ML': 'Machine Learning Solution',
};

const programmingLanguages = {
  'TS': 'TypeScript',
  'JAVA': 'Java Enterprise',
  'PYTHON': 'Python',
  'GO': 'Golang',
};

const meta = {
  title: 'UI/Forms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Project Type',
    items: projectTypes,
    onChanged: action('changed'),
  }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Select project type',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown label="Quick Project Select" items={projectTypes} size="SMALL" onChanged={action('changed')} />
      <Dropdown label="Standard Project Select" items={projectTypes} size="MEDIUM" onChanged={action('changed')} />
      <Dropdown label="Large Project Select" items={projectTypes} size="LARGE" onChanged={action('changed')} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    label: 'Archived Projects',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Project type is required for budget estimation',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'WEB',
    label: 'Active Project Type',
  },
};
