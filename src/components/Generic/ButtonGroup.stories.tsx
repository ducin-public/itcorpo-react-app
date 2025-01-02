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

export const Primary: Story = {
  args: {
    variant: 'PRIMARY',
    items: [
      { id: '1', label: 'First Option', onClick: action('first-option-clicked') },
      { id: '2', label: 'Second Option', onClick: action('second-option-clicked') },
      { id: '3', label: 'Third Option', onClick: action('third-option-clicked'), disabled: true }
    ]
  }
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'SECONDARY'
  }
};

export const Outlined: Story = {
  args: {
    ...Primary.args,
    variant: 'OUTLINED'
  }
};

export const IconOnly: Story = {
  args: {
    variant: 'SECONDARY',
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
