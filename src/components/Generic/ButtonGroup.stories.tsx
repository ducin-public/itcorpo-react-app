import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ButtonGroup } from './ButtonGroup';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const meta = {
  title: 'UI/Atoms/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', label: 'First Option', onClick: action('first-option-clicked') },
      { id: '2', label: 'Second Option', onClick: action('second-option-clicked') },
      { id: '3', label: 'Third Option', onClick: action('third-option-clicked'), disabled: true }
    ]
  }
}

export const ActionButtons: Story = {
  render: () => (
    <ButtonGroup 
      items={[
        { id: '1', label: 'Proceed', onClick: action('first-option-clicked') },
        { id: '2', label: 'Go back', onClick: action('second-option-clicked'), disabled: true },
        { id: '3', label: 'Restart', onClick: action('second-option-clicked'), fill: 'OUTLINED' },
        { id: '4', label: 'Cancel', onClick: action('third-option-clicked'), variant: 'ALERT' }
      ]}
    />
  )
};

export const IconOnly: Story = {
  args: {
    fill: 'OUTLINED',
    items: [
      { 
        id: 'prev', 
        label: <ArrowLeft className="w-4 h-4" />, 
        onClick: action('previous-clicked') 
      },
      { 
        id: 'next', 
        label: <ArrowRight className="w-4 h-4" />, 
        onClick: action('next-clicked') 
      }
    ]
  }
};
