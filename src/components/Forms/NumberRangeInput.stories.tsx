import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { NumberRangeInput } from './NumberRangeInput';

const meta = {
  title: 'UI/Forms/NumberRangeInput',
  component: NumberRangeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberRangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AgeRange: Story = {
  args: {
    label: 'Patient Age Range',
    value: { from: 18, to: 65 },
    onChange: action('age range changed'),
    min: 0,
    max: 120,
    step: 1,
    fromPlaceholder: 'From age',
    toPlaceholder: 'To age',
    suffix: 'years',
  },
};

export const PriceRange: Story = {
  args: {
    label: 'Price Range',
    value: { from: 50, to: 500 },
    onChange: action('price range changed'),
    min: 0,
    step: 10,
    fromPlaceholder: 'From',
    toPlaceholder: 'To',
    prefix: '€',
  },
};

export const DisabledRange: Story = {
  args: {
    ...AgeRange.args,
    disabled: true,
  },
};

export const TreatmentDuration: Story = {
  args: {
    label: 'Duration Range',
    value: { from: 30, to: 60 },
    onChange: action('duration range changed'),
    min: 15,
    max: 180,
    step: 15,
    fromPlaceholder: 'From',
    toPlaceholder: 'To',
    suffix: 'min',
  },
};

export const DentalImplantSize: Story = {
  args: {
    label: 'Implant Dimensions',
    value: { from: 3.5, to: 10 },
    onChange: action('implant size changed'),
    min: 2.5,
    max: 15,
    step: 0.5,
    fromPlaceholder: 'Min diameter',
    toPlaceholder: 'Max length',
    prefix: 'Ø',
    suffix: 'mm',
  },
};
