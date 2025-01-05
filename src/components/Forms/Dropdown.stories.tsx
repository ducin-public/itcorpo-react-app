import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Dropdown } from './Dropdown';

const sampleItems = {
  '1': 'Dr. John Smith - General Dentistry',
  '2': 'Dr. Sarah Wilson - Orthodontics',
  '3': 'Dr. Michael Brown - Periodontics',
};

const meta = {
  title: 'UI/Forms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Select Dentist',
    items: sampleItems,
    onChanged: action('changed'),
  }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Choose your dentist',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown label="Quick Select" items={sampleItems} size="SMALL" onChanged={action('changed')} />
      <Dropdown label="Standard Select" items={sampleItems} size="MEDIUM" onChanged={action('changed')} />
      <Dropdown label="Large Select" items={sampleItems} size="LARGE" onChanged={action('changed')} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Dropdown label="Primary Style" items={sampleItems} variant="PRIMARY" onChanged={action('changed')} />
      <Dropdown label="Secondary Style" items={sampleItems} variant="SECONDARY" onChanged={action('changed')} />
      <Dropdown label="Outline Style" items={sampleItems} variant="OUTLINED" onChanged={action('changed')} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Please select a dentist',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: '2',
  },
};
