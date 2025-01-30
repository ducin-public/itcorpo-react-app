import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { v4 as uuid } from 'uuid'

import { CheckboxGroup } from './CheckboxGroup';
import { getArgsPropsOrDie } from '../story-utils';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'UI/Forms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const simpleOptions = [
  { 
    id: 'unit', 
    label: 'Unit Testing', 
    value: 'UNIT',
    description: 'Comprehensive unit test coverage'
  },
  { 
    id: 'integration', 
    label: 'Integration Testing', 
    value: 'INTEGRATION',
    description: 'End-to-end integration test suite'
  },
  { 
    id: 'performance', 
    label: 'Performance Testing', 
    value: 'PERFORMANCE',
    description: 'Load and stress testing of applications'
  },
];

const projectOptions = [
  {
    id: 'basic-testing',
    label: 'Basic Testing Suite',
    value: 'BASIC_TEST',
    description: (
      <>
        Essential testing procedures
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Unit testing</li>
          <li>Basic integration tests</li>
          <li>Code coverage reports</li>
        </ul>
      </>
    )
  },
  {
    id: 'advanced-testing',
    label: 'Advanced Testing',
    value: 'ADV_TEST',
    description: (
      <>
        Comprehensive testing package
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>E2E testing</li>
          <li>Performance testing</li>
          <li>Security scanning</li>
        </ul>
      </>
    )
  },
  {
    id: 'deployment',
    label: 'Deployment Pipeline',
    value: 'DEPLOYMENT',
    description: (
      <>
        Complete CI/CD workflow
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Automated builds</li>
          <li>Staging deployment</li>
          <li>Production rollout</li>
        </ul>
      </>
    )
  }
];

const serviceOptions = [
  {
    id: 'code-review',
    label: 'Code Review',
    value: 'CODE_REVIEW',
    description: [
      'Standard code review',
      '2 working days',
      '$800'
    ]
  },
  {
    id: 'architecture',
    label: 'Architecture Review',
    value: 'ARCHITECTURE',
    description: [
      'System architecture analysis',
      '1 week',
      '$2000'
    ]
  },
  {
    id: 'security',
    label: 'Security Audit',
    value: 'SECURITY',
    description: [
      'Complete security assessment',
      '2 weeks',
      '$5000'
    ]
  }
];

const extendedServiceOptions = [
  {
    id: 'code-review-ext',
    label: 'Code Review',
    value: 'CODE_REVIEW',
    description: [
      'Standard code review',
      '2 working days',
      'Senior Developer',
      'Monthly',
      '$800'
    ]
  },
  {
    id: 'architecture-ext',
    label: 'Architecture Review',
    value: 'ARCHITECTURE',
    description: [
      'System architecture analysis',
      '1 week',
      'Solution Architect',
      'Quarterly',
      '$2000'
    ]
  },
  {
    id: 'security-ext',
    label: 'Security Audit',
    value: 'SECURITY',
    description: [
      'Complete security assessment',
      '2 weeks',
      'Security Expert',
      'Bi-annual',
      '$5000'
    ]
  }
];

const Template = (args: Story['args']) => {
  const header = getArgsPropsOrDie(args, 'header');
  const options = getArgsPropsOrDie(args, 'options');
  const values = getArgsPropsOrDie(args, 'values');
  const onChange = getArgsPropsOrDie(args, 'onChange');

  return <CheckboxGroup
    {...args}
    header={header}
    options={options.map(opt => ({ ...opt, id: `${opt.id}-${uuid()}` }))}
    values={values}
    onChange={onChange}
  />;
}

export const Vertical: Story = {
  render: Template,
  args: {
    header: 'Required Testing Procedures',
    options: simpleOptions,
    values: [],
    onChange: action('onChange'),
  },
};

export const VerticalWithSelection: Story = {
  render: Template,
  args: {
    header: 'Required Testing Procedures (With Selection)',
    options: simpleOptions,
    values: ['UNIT', 'PERFORMANCE'],
    onChange: action('onChange'),
  },
};

export const Horizontal: Story = {
  render: Template,
  args: {
    header: 'Required Testing Procedures (Horizontal)',
    options: simpleOptions,
    layout: 'HORIZONTAL',
    values: [],
    onChange: action('onChange'),
  },
};

export const HorizontalWithSelection: Story = {
  render: Template,
  args: {
    header: 'Required Testing Procedures (Horizontal with Selection)',
    options: simpleOptions,
    layout: 'HORIZONTAL',
    values: ['UNIT', 'PERFORMANCE'],
    onChange: action('onChange'),
  },
};

export const PanelView: Story = {
  render: Template,
  args: {
    header: 'Select Project Requirements',
    options: projectOptions,
    values: ['BASIC_TEST'],
    onChange: action('onChange'),
    layout: 'PANEL'
  }
};

export const TableView: Story = {
  render: Template,
  args: {
    header: 'Select Required Services',
    options: serviceOptions,
    values: ['CODE_REVIEW'],
    onChange: action('onChange'),
    layout: 'TABLE'
  }
};

export const ExtendedTableView: Story = {
  render: Template,
  args: {
    header: 'Select Required Services (Detailed View)',
    options: extendedServiceOptions,
    values: ['CODE_REVIEW'],
    onChange: action('onChange'),
    layout: 'TABLE'
  }
};
