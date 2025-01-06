import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const projectTypes = [
  { 
    id: 'vertical-webapp', 
    label: 'Web Application', 
    value: 'WEBAPP',
    description: 'Full-stack web application development'
  },
  { 
    id: 'vertical-mobile', 
    label: 'Mobile App', 
    value: 'MOBILE',
    description: 'Native or cross-platform mobile development'
  },
  { 
    id: 'vertical-cloud', 
    label: 'Cloud Migration', 
    value: 'CLOUD',
    description: 'Cloud infrastructure and migration services'
  },
];

const developmentApproaches = [
  { 
    id: 'horizontal-agile', 
    label: 'Agile', 
    value: 'AGILE',
    description: 'Iterative development with frequent deliverables'
  },
  { 
    id: 'horizontal-waterfall', 
    label: 'Waterfall', 
    value: 'WATERFALL',
    description: 'Traditional sequential development approach'
  },
  { 
    id: 'horizontal-hybrid', 
    label: 'Hybrid', 
    value: 'HYBRID',
    description: 'Combination of Agile and Waterfall methodologies'
  },
];

const serviceTiers = [
  {
    id: 'panel-basic',
    label: 'Basic Support',
    value: 'BASIC',
    description: (
      <>
        Essential IT Support Package
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Email support</li>
          <li>Bug fixes</li>
          <li>Monthly updates</li>
        </ul>
      </>
    )
  },
  {
    id: 'panel-standard',
    label: 'Professional',
    value: 'PROFESSIONAL',
    description: (
      <>
        Complete IT Service Solution
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Everything in Basic</li>
          <li>24/7 phone support</li>
          <li>Performance monitoring</li>
          <li>Weekly backups</li>
        </ul>
      </>
    )
  },
  {
    id: 'panel-enterprise',
    label: 'Enterprise',
    value: 'ENTERPRISE',
    description: (
      <>
        Full-scale Enterprise Support
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Everything in Professional</li>
          <li>Dedicated support team</li>
          <li>Custom development</li>
          <li>Priority resolution</li>
        </ul>
      </>
    )
  }
];

export const Vertical: Story = {
  args: {
    header: 'Select Project Type',
    options: projectTypes,
    value: '',
    onChange: action('onChange'),
  },
};

export const VerticalWithSelection: Story = {
  args: {
    header: 'Select Project Type (With Selection)',
    options: projectTypes,
    value: 'MOBILE',
    onChange: action('onChange'),
  },
};

export const Horizontal: Story = {
  args: {
    header: 'Select Development Approach',
    options: developmentApproaches,
    layout: 'HORIZONTAL',
    value: '',
    onChange: action('onChange'),
  },
};

export const HorizontalWithSelection: Story = {
  args: {
    header: 'Select Development Approach (Horizontal with Selection)',
    options: developmentApproaches,
    layout: 'HORIZONTAL',
    value: 'AGILE',
    onChange: action('onChange'),
  },
};

export const PanelView: Story = {
  args: {
    header: 'Select Service Tier',
    options: serviceTiers,
    value: 'PROFESSIONAL',
    onChange: action('onChange'),
    layout: 'PANEL'
  }
};
