import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NumberRangeInput } from './NumberRangeInput';

const meta: Meta<typeof NumberRangeInput> = {
  title: 'UI/Forms/NumberRangeInput',
  component: NumberRangeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for inputting numeric ranges, useful for salary ranges, budgets, and other financial data.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof NumberRangeInput>;

export const ProjectBudget: Story = {
  args: {
    label: 'Project Budget Range',
    value: { from: undefined, to: undefined },
    onChange: action('budget range changed'),
    fromPlaceholder: 'Min budget',
    toPlaceholder: 'Max budget',
    prefix: '$',
    suffix: 'K',
    min: 50,         // Minimum 50K budget
    max: 10000,      // Maximum 10M budget
    step: 50         // Step by 50K
  }
};

export const SalaryRange: Story = {
  args: {
    label: 'Annual Salary Range',
    value: { from: 60000, to: 120000 },
    onChange: action('salary range changed'),
    prefix: '$',
    min: 30000,      // Entry level
    max: 500000,     // Executive level
    step: 5000       // Common salary increment
  }
};

export const ContractorRate: Story = {
  args: {
    label: 'Hourly Rate Range',
    value: { from: 100, to: 250 },
    onChange: action('rate range changed'),
    prefix: '$',
    suffix: '/h',
    min: 50,         // Minimum contractor rate
    max: 500,        // Maximum contractor rate
    step: 5          // Common rate increment
  }
};

export const TeamSize: Story = {
  args: {
    label: 'Team Size Range',
    value: { from: 5, to: 15 },
    onChange: action('team size changed'),
    fromPlaceholder: 'Min team members',
    toPlaceholder: 'Max team members',
    min: 1,          // Minimum team size
    max: 100,        // Maximum team size
    step: 1          // One person at a time
  }
};

export const DisabledBillingRange: Story = {
  args: {
    label: 'Monthly Billing Range',
    value: { from: 5000, to: 25000 },
    onChange: action('billing range changed'),
    prefix: '$',
    min: 1000,       // Minimum monthly billing
    max: 100000,     // Maximum monthly billing
    step: 1000,      // Bill in thousands
    disabled: true
  }
};
