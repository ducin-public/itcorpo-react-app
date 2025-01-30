import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TextInput } from './TextInput';
import { ValidationError } from './ValidationError';
import { getArgsPropsOrDie } from '../story-utils';

const meta: Meta<typeof TextInput> = {
  title: 'UI/Forms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Project Name',
    placeholder: 'Enter project name...',
    onChange: action('onChange'),
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof TextInput>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? '');
  const label = getArgsPropsOrDie(args, 'label');
  return (
    <>
      <TextInput
        {...args}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          action('onChange')(newValue);
        }}
      />
      {args?.error && <ValidationError>This field is required</ValidationError>}
    </>
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: 'Enterprise Resource Planning System',
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    placeholder: 'e.g. Cloud Migration Project',
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
    value: 'Legacy System Migration',
    disabled: true,
  },
};
