import type { Meta, StoryObj } from '@storybook/react';
import { QuickActions } from './QuickActions';

const meta = {
  title: 'ITCORPO/Organisms/QuickActions',
  component: QuickActions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Quick Actions component provides easy access to common IT corporation management tasks like adding employees, creating projects, and managing office spaces.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof QuickActions>;

export const Default: Story = {
  args: {},
};

export const WithCustomWidth: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
