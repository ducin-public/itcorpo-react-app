import type { Meta, StoryObj } from '@storybook/react';
import { Entry } from './Entry';

const meta: Meta<typeof Entry> = {
  title: 'UI/Molecules/Entry',
  component: Entry,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Entry>;

export const Info: Story = {
  args: {
    variant: 'DEFAULT',
    label: 'Project Status',
    children: 'Sprint planning meeting scheduled for tomorrow at 10:00 AM',
  },
};

export const Success: Story = {
  args: {
    variant: 'SUCCESS',
    label: 'Deployment',
    children: 'Application successfully deployed to production environment',
  },
};

export const Warning: Story = {
  args: {
    variant: 'WARNING',
    label: 'Resource Usage',
    children: 'Server CPU usage approaching 80% threshold',
  },
};

export const Alert: Story = {
  args: {
    variant: 'ALERT',
    label: 'Security Alert',
    children: 'Critical security patch requires immediate system update',
  },
};

export const Update: Story = {
  args: {
    variant: 'UPDATE',
    label: 'System Update',
    children: 'New features deployed: Enhanced API performance and monitoring tools',
  },
};

export const WithLink: Story = {
  args: {
    variant: 'SUCCESS',
    label: 'Project Dashboard',
    children: 'View detailed sprint metrics and team velocity',
    to: '/project/dashboard',
  },
};
