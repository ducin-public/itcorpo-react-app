import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  DownloadIcon,
  CheckIcon,
  XIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon
} from 'lucide-react';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'UI/Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: PlusIcon,
    onClick: action('clicked'),
    label: 'Add item',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={PlusIcon}
          size="SMALL"
          onClick={action('clicked-small')}
          label="Add module"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={PlusIcon}
          size="MEDIUM"
          onClick={action('clicked-medium')}
          label="Add component"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={PlusIcon}
          size="LARGE"
          onClick={action('clicked-large')}
          label="Add project"
        />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton icon={CheckIcon} variant="SUCCESS" label="Approve" />
      <IconButton icon={XIcon} variant="ALERT" label="Reject" />
      <IconButton icon={BellIcon} variant="WARNING" label="Notifications" />
      <IconButton icon={SettingsIcon} variant="DEFAULT" label="Settings" />
      <IconButton icon={PlusIcon} variant="ACCENT" label="Add new" />
    </div>
  ),
};

export const CommonActions: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton 
        icon={PlusIcon} 
        variant="SUCCESS" 
        label="Add new project"
        onClick={action('add-project')}
      />
      <IconButton 
        icon={TrashIcon} 
        variant="ALERT" 
        label="Delete deployment"
        onClick={action('delete-deployment')}
      />
      <IconButton 
        icon={PencilIcon} 
        variant="DEFAULT" 
        label="Edit configuration"
        onClick={action('edit-config')}
      />
      <IconButton 
        icon={DownloadIcon} 
        variant="ACCENT" 
        label="Download report"
        onClick={action('download-report')}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    icon: TrashIcon,
    disabled: true,
    variant: 'ALERT',
    label: 'Delete (disabled)',
    onClick: action('should-not-trigger'),
  },
};

export const WithCustomStyles: Story = {
  args: {
    icon: SearchIcon,
    className: 'absolute right-2 top-2',
    label: 'Search',
    onClick: action('search'),
  },
};
