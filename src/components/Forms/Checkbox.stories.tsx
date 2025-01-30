import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from './Checkbox';
import { get } from 'mobx';
import { getArgsPropsOrDie } from '../story-utils';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template = (args: Story['args']) => {
  const [checked, setChecked] = useState(args?.checked || false);
  const handleChange = (newValue: boolean) => {
    setChecked(newValue);
    action('onChange')(newValue);
  };
  const id = getArgsPropsOrDie(args, 'id');
  const label = getArgsPropsOrDie(args, 'label');

  return <Checkbox
    {...args}
    id={id}
    label={label}
    checked={checked}
    onChange={handleChange}
  />;
};

export const Default: Story = {
  render: Template,
  args: {
    id: 'unit-testing',
    label: 'Include Unit Tests',
    checked: false,
  },
};

export const Checked: Story = {
  render: Template,
  args: {
    id: 'ci-cd',
    label: 'Enable CI/CD Pipeline',
    checked: true,
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    id: 'required-checkbox',
    label: 'Required Field',
    checked: false,
    error: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    id: 'disabled-checkbox',
    label: 'Disabled Option',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: Template,
  args: {
    id: 'disabled-checked',
    label: 'Disabled Checked Option',
    checked: true,
    disabled: true,
  },
};
