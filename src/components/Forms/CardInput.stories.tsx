import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CardInput } from './CardInput';
import { styles } from '../DesignEnums/MessageType';
import { Button } from '../Generic/Button';
import { H3 } from '../Typography/Headings';

const meta: Meta<typeof CardInput> = {
  title: 'UI/Forms/CardInput',
  component: CardInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardInput>;

export const Empty: Story = {
  args: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    onChange: action('onChange'),
  },
};

export const FilledPayment: Story = {
  args: {
    cardNumber: '4111 1111 1111 1111',
    expiryDate: '12/25',
    cvv: '123',
    onChange: action('onChange'),
  },
};

export const WithinPaymentForm: Story = {
  render: () => (
    <div className="w-96 p-6 border rounded-lg shadow-sm">
      <H3>Payment for Cloud Services</H3>
      <CardInput
        cardNumber=""
        expiryDate=""
        cvv=""
        onChange={action('onChange')}
      />
      <Button className={`mt-4 w-full text-white py-2 rounded-md`}>
        Pay $299.00
      </Button>
    </div>
  ),
};

export const SeparateLayout: Story = {
  args: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    onChange: action('onChange'),
    layout: 'SEPARATE'
  },
};

export const StackedLayout: Story = {
  args: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    onChange: action('onChange'),
    layout: 'STACKED'
  },
};
