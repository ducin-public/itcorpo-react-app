import type { Meta, StoryObj } from '@storybook/react';
import { DetailsSection } from './DetailsSection';

const meta: Meta<typeof DetailsSection> = {
  title: 'UI/Molecules/DetailsSection',
  component: DetailsSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DetailsSection>;

export const Default: Story = {
  args: {
    title: 'Employment Details',
    lines: [
      { label: 'Position', value: 'Senior Software Engineer' },
      { label: 'Department', value: 'Engineering' },
      { label: 'Location', value: 'Warsaw, Poland' },
    ],
  },
};

export const WithDates: Story = {
  args: {
    title: 'Project Timeline',
    lines: [
      { label: 'Start Date', value: 'Jan 1, 2024' },
      { label: 'End Date', value: 'Dec 31, 2024' },
      { label: 'Duration', value: '12 months' },
    ],
  },
};

export const WithCurrency: Story = {
  args: {
    title: 'Financial Details',
    lines: [
      { label: 'Budget', value: '€50,000' },
      { label: 'Spent', value: '€35,000' },
      { label: 'Remaining', value: '€15,000' },
    ],
  },
};
