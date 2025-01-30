import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NumberRangeInput } from './NumberRangeInput';
import { ValidationError } from './ValidationError';
import { getArgsPropsOrDie } from '../story-utils';

const meta = {
  title: 'UI/Forms/NumberRangeInput',
  component: NumberRangeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Project Budget Range',
    fromPlaceholder: 'Min budget',
    toPlaceholder: 'Max budget',
    step: 10,
    prefix: '$',
    suffix: 'K',
    value: { from: undefined, to: undefined },
    onChange: action('onChange'),
  },
} satisfies Meta<typeof NumberRangeInput>;

export default meta;
type Story = StoryObj<typeof NumberRangeInput>;

const Template = (args: Story['args']) => {
  const [value, setValue] = useState(args?.value ?? { from: undefined, to: undefined });
  const label = getArgsPropsOrDie(args, 'label');

  return (
    <>
      <NumberRangeInput
        {...args}
        label={label}
        value={value}
        errorFrom={args?.errorFrom}
        errorTo={args?.errorTo}
        onChange={(newValue) => {
          setValue(newValue);
          action('onChange')(newValue);
        }}
      />
      {(args?.errorFrom || args?.errorTo) && (
        <ValidationError>
          Value range is required
        </ValidationError>
      )}
    </>
  );
};

export const Default = Template.bind({});

export const WithStep: Story = {
  render: Template,
  args: {
    value: { from: 50000, to: 100000 },
    step: 10000,
  },
};

export const WithValue: Story = {
  render: Template,
  args: {
    value: { from: 50000, to: 100000 },
  },
};

export const WithErrorFrom: Story = {
  render: Template,
  args: {
    errorFrom: true,
  },
};

export const WithErrorTo: Story = {
  render: Template,
  args: {
    errorTo: true,
  },
};

export const WithErrorBoth: Story = {
  render: Template,
  args: {
    errorFrom: true,
    errorTo: true,
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
    value: { from: 50000, to: 100000 },
    disabled: true,
  },
};

// Additional stories specific to NumberRangeInput
export const ContractorRate: Story = {
  render: Template,
  args: {
    label: 'Hourly Rate Range',
    prefix: '$',
    suffix: '/h',
    value: { from: 100, to: 250 },
    min: 50,
    max: 500,
    step: 5,
  },
};

export const TeamSize: Story = {
  render: Template,
  args: {
    label: 'Team Size',
    value: { from: 5, to: 15 },
    fromPlaceholder: 'Min team members',
    toPlaceholder: 'Max team members',
    min: 1,
    max: 100,
    step: 1,
  },
};
