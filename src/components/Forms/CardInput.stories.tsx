import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CardInput } from './CardInput';
import { ValidationError } from './ValidationError';
import { Button } from '../Generic/Button';
import { H3 } from '../Typography/Headings';

const meta = {
  title: 'UI/Forms/CardInput',
  component: CardInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    onChange: action('onChange'),
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
} satisfies Meta<typeof CardInput>;

export default meta;
type Story = StoryObj<typeof CardInput>;

const Template = (args: Story['args']) => {
  const [values, setValues] = useState({
    cardNumber: args?.cardNumber ?? '',
    expiryDate: args?.expiryDate ?? '',
    cvv: args?.cvv ?? '',
  });

  return (
    <>
      <CardInput
        {...args}
        {...values}
        onChange={(newValues) => {
          setValues(newValues);
          action('onChange')(newValues);
        }}
      />
      {args?.error && <ValidationError>Please check your card details</ValidationError>}
    </>
  );
};

export const Default = Template.bind({});

export const WithValue: Story = {
  render: Template,
  args: {
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123',
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
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123',
    disabled: true,
  },
};

export const StackedLayout: Story = {
  render: Template,
  args: {
    layout: 'STACKED',
  },
};

export const CustomStyling: Story = {
  render: Template,
  args: {
    className: 'p-4 bg-gray-50 rounded-lg shadow-sm',
  },
};
