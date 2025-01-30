import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Autocomplete } from './Autocomplete';
import { ValidationError } from './ValidationError';
import { styles } from '../DesignLanguage';
import { getArgsPropsOrDie } from '../story-utils';
import { cn } from '../cn';

const developers = [
  { id: 'D1', label: 'John Doe - Senior Frontend Developer' },
  { id: 'D2', label: 'Jane Smith - DevOps Engineer' },
  { id: 'D3', label: 'Emily Johnson - Backend Developer' },
  { id: 'D4', label: 'Michael Brown - Solution Architect' },
  { id: 'D5', label: 'Sarah Davis - Security Engineer' },
  { id: 'D6', label: 'David Wilson - Full Stack Developer' }
];

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
    options: developers,
    value: '',
    onChange: action('onChange'),
  },
  decorators: [(Story) => <div className="w-[400px]">{Story()}</div>],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? '');
  const options = getArgsPropsOrDie(args, 'options');
  const label = getArgsPropsOrDie(args, 'label');
  return (
    <>
      <Autocomplete
        {...args}
        value={value}
        label={label}
        options={options}
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
    value: 'John Doe',
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
    value: 'John Doe',
    disabled: true,
  },
};

export const CustomRendering: Story = {
  render: Template,
  args: {
    renderInput: ({ value, onChange, onFocus, disabled, error }) => (
      <div className="flex flex-col gap-1">
        <label className={cn('text-lg font-medium', error ? styles.ALERT.text : styles.ACCENT.text)}>
          Find Developer
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
          placeholder="Type developer name..."
        />
      </div>
    ),
  },
};
