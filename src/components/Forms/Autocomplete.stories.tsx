import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Autocomplete } from './Autocomplete';
import { TextInput } from './TextInput';
import { styles } from '../DesignEnums/MessageType';

const meta: Meta<typeof Autocomplete> = {
  title: 'UI/Forms/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A searchable dropdown component that allows users to filter through a list of options and select one.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const developers = [
  { id: '1', label: 'John Doe - Senior Frontend Developer' },
  { id: '2', label: 'Jane Smith - DevOps Engineer' },
  { id: '3', label: 'Emily Johnson - Backend Developer' },
  { id: '4', label: 'Michael Brown - Solution Architect' },
  { id: '5', label: 'Sarah Davis - Security Engineer' },
  { id: '6', label: 'David Wilson - Full Stack Developer' }
];

const services = [
  { id: '1', label: 'Cloud Infrastructure Setup' },
  { id: '2', label: 'Database Optimization' },
  { id: '3', label: 'API Development' },
  { id: '4', label: 'UI/UX Implementation' },
  { id: '5', label: 'Performance Optimization' }
];

export const DeveloperSearch: Story = {
  args: {
    options: developers,
    label: "Team Member",
    placeholder: "Search for a team member...",
    onSelect: action('Team member selected'),
    maxItems: 5
  }
};

export const ServiceSearch: Story = {
  args: {
    options: services,
    label: "Service",
    placeholder: "Search for a service...",
    onSelect: action('Service selected'),
    maxItems: 3
  }
};

export const NoMaxLimit: Story = {
  args: {
    options: developers,
    label: "Team Member",
    placeholder: "Search for any team member...",
    onSelect: action('Team member selected'),
    maxItems: undefined
  }
};

export const CustomRendering: Story = {
  args: {
    options: developers,
    placeholder: "Search for team member...",
    renderInput: ({ value, onChange }) => (
      <div className="flex flex-col gap-1">
        <label className={`text-lg font-medium ${styles.WARNING.text}`}>Find Developer</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`p-4 border ${styles.WARNING.border} rounded-lg focus:outline-none focus:ring-2 ${styles.WARNING.focusRing}`}
          placeholder="Type developer name..."
        />
      </div>
    ),
    onSelect: action('Developer selected'),
    maxItems: 5
  }
};
