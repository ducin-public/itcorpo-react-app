import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import { ComponentProps, useState } from 'react';

const meta: Meta<typeof TextArea> = {
  title: 'UI/Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

type TextAreaWrapperProps = Omit<ComponentProps<typeof TextArea>, 'value' | 'onChange'>
const TextAreaWrapper = (props: TextAreaWrapperProps) => {
  const [value, setValue] = useState('');
  return <TextArea {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <TextAreaWrapper label="Technical Requirements" placeholder="Enter project technical requirements..." />,
};

export const WithError: Story = {
  render: () => <TextAreaWrapper label="Deployment Instructions" error="Deployment steps cannot be empty" />,
};

export const CustomRows: Story = {
  render: () => <TextAreaWrapper label="Project Documentation" rows={8} />,
};
