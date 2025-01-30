import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PhoneInput } from './PhoneInput';
import { ValidationError } from './ValidationError';
import { getArgsPropsOrDie } from '../story-utils';

const meta = {
  title: 'UI/Forms/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Contact Phone',
    value: '',
    onChange: action('onChange'),
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof PhoneInput>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? '');
  const label = getArgsPropsOrDie(args, 'label');
  
  return (
    <>
      <PhoneInput
        {...args}
        label={label}
        value={value}
        onChange={(newValue, isValid) => {
          setValue(newValue);
          action('onChange')(newValue, isValid);
        }}
      />
      {args?.error && <ValidationError>Invalid phone number format</ValidationError>}
    </>
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: '123456789',
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
    value: '123456789',
    disabled: true,
  },
};
