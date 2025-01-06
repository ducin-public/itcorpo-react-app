import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'UI/Forms/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const simpleOptions = [
  { 
    id: 'xray', 
    label: 'Dental X-Ray', 
    value: 'XRAY',
    description: 'Complete mouth X-ray scanning'
  },
  { 
    id: 'scan', 
    label: '3D Dental Scan', 
    value: 'SCAN',
    description: 'Advanced 3D imaging of teeth and jaw'
  },
  { 
    id: 'photo', 
    label: 'Intraoral Photos', 
    value: 'PHOTO',
    description: 'Detailed photos of teeth and gums'
  },
];

const treatmentOptions = [
  {
    id: 'basic-diagnostics',
    label: 'Basic Diagnostics',
    value: 'BASIC_DIAG',
    description: (
      <>
        Essential diagnostic procedures
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Regular X-rays</li>
          <li>Visual examination</li>
          <li>Basic photos</li>
        </ul>
      </>
    )
  },
  {
    id: 'advanced-diagnostics',
    label: 'Advanced Diagnostics',
    value: 'ADV_DIAG',
    description: (
      <>
        Comprehensive diagnostic package
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>3D dental scanning</li>
          <li>Full mouth X-rays</li>
          <li>Detailed imaging</li>
        </ul>
      </>
    )
  },
  {
    id: 'preventive-care',
    label: 'Preventive Care',
    value: 'PREVENTIVE',
    description: (
      <>
        Complete preventive examination
        <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
          <li>Cavity detection</li>
          <li>Gum disease screening</li>
          <li>Oral cancer screening</li>
        </ul>
      </>
    )
  }
];

const tableOptions = [
  {
    id: 'basic-xray',
    label: 'Basic X-Ray',
    value: 'BASIC_XRAY',
    description: [
      'Regular dental X-ray',
      '15 minutes',
      '$50'
    ]
  },
  {
    id: 'panoramic',
    label: 'Panoramic X-Ray',
    value: 'PANORAMIC',
    description: [
      'Full mouth panoramic view',
      '20 minutes',
      '$100'
    ]
  },
  {
    id: '3d-scan',
    label: '3D Dental Scan',
    value: '3D_SCAN',
    description: [
      'Complete 3D jaw scanning',
      '30 minutes',
      '$200'
    ]
  }
];

const extendedTableOptions = [
  {
    id: 'basic-xray-ext',
    label: 'Basic X-Ray',
    value: 'BASIC_XRAY',
    description: [
      'Regular dental X-ray',
      '15 minutes',
      'Dr. Emily White',
      'Every 12 months',
      '$50'
    ]
  },
  {
    id: 'panoramic-ext',
    label: 'Panoramic X-Ray',
    value: 'PANORAMIC',
    description: [
      'Full mouth panoramic view',
      '20 minutes',
      'Dr. Robert Brown',
      'Every 24 months',
      '$100'
    ]
  },
  {
    id: '3d-scan-ext',
    label: '3D Dental Scan',
    value: '3D_SCAN',
    description: [
      'Complete 3D jaw scanning',
      '30 minutes',
      'Dr. Michael Chen',
      'As needed',
      '$200'
    ]
  }
];

export const Vertical: Story = {
  args: {
    header: 'Required Diagnostics',
    options: simpleOptions,
    values: [],
    onChange: action('onChange'),
  },
};

export const VerticalWithSelection: Story = {
  args: {
    header: 'Required Diagnostics (With Selection)',
    options: simpleOptions,
    values: ['XRAY', 'PHOTO'],
    onChange: action('onChange'),
  },
};

export const Horizontal: Story = {
  args: {
    header: 'Required Diagnostics (Horizontal)',
    options: simpleOptions,
    layout: 'HORIZONTAL',
    values: [],
    onChange: action('onChange'),
  },
};

export const HorizontalWithSelection: Story = {
  args: {
    header: 'Required Diagnostics (Horizontal with Selection)',
    options: simpleOptions,
    layout: 'HORIZONTAL',
    values: ['XRAY', 'PHOTO'],
    onChange: action('onChange'),
  },
};

export const PanelView: Story = {
  args: {
    header: 'Select Diagnostic Procedures',
    options: treatmentOptions,
    values: ['BASIC_DIAG'],
    onChange: action('onChange'),
    layout: 'PANEL'
  }
};

export const TableView: Story = {
  args: {
    header: 'Select Required X-Rays',
    options: tableOptions,
    values: ['BASIC_XRAY'],
    onChange: action('onChange'),
    layout: 'TABLE'
  }
};

export const ExtendedTableView: Story = {
  args: {
    header: 'Select Required X-Rays (Detailed View)',
    options: extendedTableOptions,
    values: ['BASIC_XRAY'],
    onChange: action('onChange'),
    layout: 'TABLE'
  }
};
