import type { Meta, StoryObj } from '@storybook/react';
import { Search, Edit, Trash2, Download } from 'lucide-react';
import { action } from '@storybook/addon-actions';
import { ActionButtons } from './ActionButtons';

const meta: Meta<typeof ActionButtons> = {
  title: 'UI/Molecules/ActionButtons',
  component: ActionButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ActionButtons>;

export const Default: Story = {
  args: {
    actions: [
      {
        icon: Search,
        text: 'View Details',
        onClick: action('view-details')
      }
    ]
  }
};

export const MultipleActions: Story = {
  args: {
    actions: [
      {
        icon: Search,
        text: 'View Project',
        onClick: action('view')
      },
      {
        icon: Edit,
        text: 'Edit Project',
        onClick: action('edit')
      },
      {
        icon: Trash2,
        text: 'Delete Project',
        onClick: action('delete')
      },
      {
        icon: Download,
        text: 'Download Report',
        onClick: action('download')
      }
    ],
    className: 'mt-2'
  }
};
