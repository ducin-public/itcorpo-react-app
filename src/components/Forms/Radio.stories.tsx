import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Radio } from './Radio';
import { getArgsPropsOrDie } from '../story-utils';

const meta: Meta<typeof Radio> = {
  title: 'UI/Forms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template = (args: Story['args']) => {
  const [selectedValue, setSelectedValue] = useState(args?.checked ? args.value : '');
  
  const handleChange = (value: string) => {
    setSelectedValue(value);
    action('onChange')(value);
  };

  const id = getArgsPropsOrDie(args, 'id');
  const name = getArgsPropsOrDie(args, 'name');
  const label = getArgsPropsOrDie(args, 'label');
  const value = getArgsPropsOrDie(args, 'value');

  return (
    <Radio 
      {...args}
      id={id}
      name={name}
      label={label}
      value={value}
      checked={selectedValue === args?.value}
      onChange={handleChange}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    id: 'frontend',
    name: 'project-type',
    label: 'Frontend Development',
    value: 'frontend',
    checked: false,
  },
};

export const Checked: Story = {
  render: Template,
  args: {
    id: 'backend',
    name: 'project-type',
    label: 'Backend Development',
    value: 'backend',
    checked: true,
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    id: 'required-radio',
    name: 'project-type',
    label: 'Project Type',
    value: 'required',
    checked: false,
    error: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    id: 'disabled-radio',
    name: 'project-type',
    label: 'Legacy Project',
    value: 'legacy',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: Template,
  args: {
    id: 'disabled-checked-radio',
    name: 'project-type',
    label: 'Archived Project',
    value: 'archived',
    checked: true,
    disabled: true,
  },
};
