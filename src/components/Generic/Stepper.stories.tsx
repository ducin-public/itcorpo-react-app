import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Atoms/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A stepper component that shows progress through a multi-step process. Steps can be clickable based on the current progress.'
      }
    }
  },
  args: {
    onStepClick: action('Step clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const FirstStep: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    isStepClickable: (step) => false, // No steps are clickable when starting
  },
};

export const SecondStepWithFirstClickable: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    isStepClickable: (step) => step < 2, // Only first step is clickable
  },
};

export const ThirdStepWithPreviousClickable: Story = {
  args: {
    currentStep: 3,
    totalSteps: 4,
    isStepClickable: (step) => step < 3, // First and second steps are clickable
  },
};

export const LastStepAllPreviousClickable: Story = {
  args: {
    currentStep: 4,
    totalSteps: 4,
    isStepClickable: (step) => step < 4, // All previous steps are clickable
  },
};
