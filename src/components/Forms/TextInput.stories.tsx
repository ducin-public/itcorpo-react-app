import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { ComponentProps, useState } from 'react';

const meta: Meta<typeof TextInput> = {
  title: 'UI/Forms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

type TextInputWrapperProps = Omit<ComponentProps<typeof TextInput>, 'value' | 'onChange'>
const TextInputWrapper = (props: TextInputWrapperProps) => {
  const [value, setValue] = useState('');
  return <TextInput {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <TextInputWrapper label="Project Name" />,
};

export const WithError: Story = {
  render: () => <TextInputWrapper label="Repository URL" type="url" error="Please enter a valid repository URL" />,
};

export const Password: Story = {
  render: () => <TextInputWrapper label="API Key" type="password" />,
};
