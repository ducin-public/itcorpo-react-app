import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SkillsInput } from './SkillsInput';

const meta = {
  title: 'ITCORPO/Employees/SkillsInput',
  component: SkillsInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: action('onChange'),
  },
} satisfies Meta<typeof SkillsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-[500px]">
      <SkillsInput {...args} />
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledWithSkills: Story = {
  args: {
    disabled: true,
    initialSkills: ['Java', 'Spring Boot', 'PostgreSQL'],
  },
  render: (args) => (
    <div className="w-[500px]">
      <SkillsInput {...args} />
    </div>
  )
};

export const WithError: Story = {
  args: {
    error: 'Please add at least one skill',
  },
};

export const CustomRendering: Story = {
  args: {
    className: 'bg-gray-100 p-4 rounded-lg shadow-sm',
    initialSkills: ['Docker', 'Kubernetes', 'AWS'],
  },
  render: (args) => {
    return (
      <div className="w-[500px]">
        <SkillsInput {...args} />
      </div>
    );
  },
};
