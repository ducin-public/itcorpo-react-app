import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Paragraph } from '../Typography/Paragraph';

const meta = {
  title: 'UI/Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96 p-4">
      <Paragraph size="SMALL">Section divider</Paragraph>
      <Divider />
      <Paragraph size="SMALL">Next section</Paragraph>
    </div>
  ),
};

export const CustomClassName: Story = {
  render: () => (
    <div className="w-96 p-4">
      <Paragraph size="SMALL">Extended spacing divider</Paragraph>
      <Divider className='my-8' />
      <Paragraph size="SMALL">Next section with more space</Paragraph>
    </div>
  ),
};