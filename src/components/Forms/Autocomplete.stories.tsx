import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Autocomplete, type Option } from './Autocomplete';
import { ValidationError } from './ValidationError';
import { styles } from '../DesignLanguage';
import { cn } from '../cn';
import { getArgsPropsOrDie } from '../story-utils';

// Mock data simulating a database of IT team members
const teamMembersDB: Option[] = [
  { id: 'dev1', label: 'John Smith - Senior Frontend Developer' },
  { id: 'dev2', label: 'Sarah Johnson - DevOps Engineer' },
  { id: 'dev3', label: 'Michael Chen - Full Stack Developer' },
  { id: 'dev4', label: 'Emily Brown - Backend Developer' },
  { id: 'dev5', label: 'David Wilson - Solution Architect' },
  { id: 'dev6', label: 'Alice Taylor - Technical Lead' },
  { id: 'dev7', label: 'Robert Martinez - Cloud Engineer' },
  { id: 'dev8', label: 'Lisa Anderson - Security Engineer' },
  { id: 'dev9', label: 'James Wilson - Mobile Developer' },
  { id: 'dev10', label: 'Emma Davis - UI/UX Developer' },
];

// Simulated API fetch with delay and fuzzy search
const mockFetchTeamMembers = async (phrase: string): Promise<Option[]> => {
  // Simulate network delay between 200-500ms
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

  if (!phrase) return [];

  // Case-insensitive search in both id and label
  return teamMembersDB.filter(member => 
    member.label.toLowerCase().includes(phrase.toLowerCase()) ||
    member.id.toLowerCase().includes(phrase.toLowerCase())
  );
};

const meta = {
  title: 'UI/Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Team Member',
    placeholder: 'Search for team member...',
    fetchOptions: mockFetchTeamMembers,
    value: '',
    onChange: action('onChange'),
  },
  decorators: [(Story) => <div className="w-[400px]">{Story()}</div>],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? '');
  const label = args?.label ?? 'Team Member';
  const fetchOptions = getArgsPropsOrDie(args, 'fetchOptions');
  return (
    <>
      <Autocomplete
        {...args}
        value={value}
        label={label}
        fetchOptions={fetchOptions}
        onChange={(newValue) => {
          setValue(newValue);
          action('onChange')(newValue);
        }}
      />
      {args?.error && <ValidationError>Please select a team member</ValidationError>}
    </>
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    value: 'John Smith',
  },
};

export const WithError: Story = {
  render: Template,
  args: {
    error: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  render: Template,
  args: {
    value: 'John Smith',
    disabled: true,
  },
};

export const CustomRendering: Story = {
  render: Template,
  args: {
    renderInput: ({ value, onChange, onFocus, disabled, error }) => (
      <div className="flex flex-col gap-1">
        <label className={cn('text-lg font-medium', error ? styles.ALERT.text : styles.ACCENT.text)}>
          Find Team Member
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          disabled={disabled}
          className={cn(
            'p-4 border rounded-lg',
            'focus:outline-none focus:ring-2',
            {
              'opacity-50 cursor-not-allowed bg-gray-100': disabled,
              [styles.ALERT.border]: error,
              [styles.ACCENT.border]: !error,
              [styles.ALERT.focusRing]: error,
              [styles.ACCENT.focusRing]: !error,
            }
          )}
          placeholder="Type team member name..."
        />
      </div>
    ),
  },
};
