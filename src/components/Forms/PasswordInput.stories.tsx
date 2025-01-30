import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PasswordInput } from './PasswordInput';
import { ValidationError } from './ValidationError';
import { getArgsPropsOrDie } from '../story-utils';

const meta = {
  title: 'UI/Forms/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    onChange: action('onChange'),
    value: '',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof PasswordInput>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? '');
  const label = getArgsPropsOrDie(args, 'label');
  return (
    <>
      <PasswordInput
        {...args}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          action('onChange')(newValue);
        }}
      />
      {args?.error && <ValidationError>Password is required</ValidationError>}
    </>
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: 'secretpassword123',
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    placeholder: 'Enter a strong password',
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
    value: 'secretpassword123',
    disabled: true,
  },
};

const PasswordConfirmationTemplate = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const error = password && confirmPassword && password !== confirmPassword;
  
  return (
    <div className="space-y-4 w-64">
      <PasswordInput 
        label="Password" 
        value={password} 
        onChange={setPassword}
      />
      <PasswordInput 
        label="Confirm Password" 
        value={confirmPassword} 
        onChange={setConfirmPassword}
      />
      {error && <ValidationError>Passwords do not match</ValidationError>}
    </div>
  );
}

export const PasswordConfirmation: Story = {
  render: PasswordConfirmationTemplate,
};
