import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'UI/Forms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[300px]">{Story()}</div>],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper for interactive stories
const ControlledMultiSelect = (args: React.ComponentProps<typeof MultiSelect>) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <MultiSelect
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        action('onChange')(newValue);
      }}
    />
  );
};

export const Specialties: Story = {
  args: {
    label: "Medical Specialties",
    options: [
      { label: 'Orthodontics', value: 'orthodontics' },
      { label: 'Dental Surgery', value: 'dental-surgery' },
      { label: 'Periodontics', value: 'periodontics' },
      { label: 'Endodontics', value: 'endodontics' },
      { label: 'Pediatric Dentistry', value: 'pediatric' },
    ],
    placeholder: "Select specialties...",
    value: [],
    onChange: action('onChange'),
  },
};

export const Languages: Story = {
  args: {
    label: "Languages Spoken",
    options: [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Italian', value: 'it' },
    ],
    placeholder: "Select languages...",
    value: [],
    onChange: action('onChange'),
  },
};

export const Clinics: Story = {
  args: {
    label: "Clinic Locations",
    options: [
      { label: 'Downtown Dental Center', value: 'downtown' },
      { label: 'North Side Clinic', value: 'north' },
      { label: 'West End Dental Care', value: 'west' },
      { label: 'East Side Smiles', value: 'east' },
      { label: 'South Gate Dental', value: 'south' },
    ],
    placeholder: "Select clinics...",
    value: [],
    onChange: action('onChange'),
  },
};

export const WithPreselectedValues: Story = {
  args: {
    label: "Preselected Specialties",
    options: [
      { label: 'Orthodontics', value: 'orthodontics' },
      { label: 'Dental Surgery', value: 'dental-surgery' },
      { label: 'Periodontics', value: 'periodontics' },
      { label: 'Endodontics', value: 'endodontics' },
      { label: 'Pediatric Dentistry', value: 'pediatric' },
    ],
    value: ['orthodontics', 'periodontics'],
    onChange: action('onChange'),
    placeholder: "Select specialties...",
  },
};

export const Empty: Story = {
  args: {
    label: "No Options",
    options: [],
    value: [],
    onChange: action('onChange'),
    placeholder: "No options available",
  },
};
