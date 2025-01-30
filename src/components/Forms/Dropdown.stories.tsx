import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from './Dropdown';
import { assertExists, getArgsPropsOrDie } from '../story-utils';

const projectTypes = {
  'CLOUD_MIGRATION': 'Cloud Migration',
  'ENTERPRISE_APP': 'Enterprise Application',
  'MOBILE_APP': 'Mobile Application',
  'DATA_ANALYTICS': 'Data Analytics',
  'DEVOPS': 'DevOps Transformation',
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
    options: projectTypes,
    placeholder: 'Select project type...',
    onChange: action('onChange'),
    value: '',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? '');
  const label = getArgsPropsOrDie(args, 'label');
  const options = getArgsPropsOrDie(args, 'options');
  return (
    <Dropdown
      {...args}
      label={label}
      options={options}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        action('onChange')(newValue);
      }}
    />
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: 'CLOUD_MIGRATION',
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    placeholder: 'Choose project category...',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  render: Template,
  args: {
    value: 'ENTERPRISE_APP',
    disabled: true,
  },
};
