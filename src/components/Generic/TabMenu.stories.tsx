import type { Meta, StoryObj } from '@storybook/react';
import { Users, Building, Briefcase, FileSpreadsheet, UserCog } from 'lucide-react';
import { TabMenu } from './TabMenu';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof TabMenu> = {
  title: 'UI/Layout/TabMenu',
  component: TabMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    items: [
      { label: 'Project Overview', link: '/projects/123', icon: Briefcase },
      { label: 'Team Members', link: '/projects/123/team', icon: Users },
      { label: 'Budget', link: '/projects/123/budget', icon: FileSpreadsheet },
      { label: 'Manage Access', icon: UserCog, onClick: action('onManageAccessClick') }
    ],
    selectedValue: '/projects/123',
    onNavigate: action('onNavigate')
  }
};

export default meta;
type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {};

export const WithoutIcons: Story = {
  args: {
    items: [
      { label: 'Project Details', link: '/projects/123' },
      { label: 'Documentation', link: '/projects/123/docs' },
      { label: 'Dependencies', link: '/projects/123/deps' },
      { label: 'Export Data', onClick: action('onExportClick') }
    ],
    selectedValue: '/projects/123'
  }
};

export const OfficeLocations: Story = {
  args: {
    items: [
      { label: 'All Offices', link: '/offices', icon: Building },
      { label: 'Europe', link: '/offices/eu', icon: Building },
      { label: 'North America', link: '/offices/na', icon: Building },
      { label: 'Asia Pacific', link: '/offices/apac', icon: Building }
    ],
    selectedValue: '/offices'
  }
};

export const WithActionButtons: Story = {
  args: {
    items: [
      { label: 'Employee List', link: '/employees', icon: Users },
      { label: 'Org Chart', link: '/employees/org', icon: Users },
      { label: 'Import Data', onClick: action('onImportClick'), icon: FileSpreadsheet },
      { label: 'Export Data', onClick: action('onExportClick'), icon: FileSpreadsheet }
    ],
    selectedValue: '/employees'
  }
};

export const CustomRendering: Story = {
  args: {
    ...meta.args,
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-4 rounded-lg w-[800px]">
        <Story />
      </div>
    ),
  ],
};
