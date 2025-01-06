import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'UI/Molecules/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: {
    children: 'JS',  // John Smith - Tech Lead
    size: 'MEDIUM',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=68',
    size: 'MEDIUM',
  },
};

export const Small: Story = {
  args: {
    children: 'JD',
    size: 'SMALL',
  },
};

export const Large: Story = {
  args: {
    children: 'JD',
    size: 'LARGE',
  },
};
