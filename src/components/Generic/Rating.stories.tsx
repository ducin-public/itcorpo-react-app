import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Heart, Sun, Pill, ThumbsUp, Star } from 'lucide-react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Molecules/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A rating component that allows users to rate items using various icons.'
      }
    }
  },
  argTypes: {
    scale: {
      description: 'The maximum number of stars to display',
      control: { type: 'number', min: 1, max: 10 }
    },
    value: {
      description: 'The current rating value',
      control: { type: 'number', min: 0 }
    },
    onChange: {
      description: 'Callback function called when the rating changes'
    },
    className: {
      description: 'Additional CSS classes to apply to the rating component'
    },
    icon: {
      description: 'The icon to use for rating',
      control: 'select',
      options: [
        'Star',
        'Heart',
        'ThumbsUp',
        'Sun',
        'Pill'
      ],
      mapping: {
        Star,
        Heart,
        ThumbsUp,
        Sun,
        Pill
      }
    },
    activeColor: {
      description: 'Color used for active/filled icons',
      control: 'color'
    }
  },
  args: {
    scale: 5,
    onChange: action('rating changed'),
  }
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Stars: Story = {
  args: {
    value: 3,
    icon: Star,
    activeColor: '#fbbf24'
  }
};

export const Hearts: Story = {
  args: {
    value: 4,
    icon: Heart,
    activeColor: '#ef4444' // red-500
  }
};

export const Pills: Story = {
  args: {
    value: 2,
    icon: Pill,
    activeColor: '#10b981' // green-500
  }
};
export const Thumbs: Story = {
  args: {
    value: 3,
    icon: ThumbsUp,
    activeColor: '#3b82f6' // blue-500
  }
};

export const CustomScale: Story = {
  args: {
    scale: 10,
    value: 7,
    icon: Star,
    activeColor: '#fbbf24'
  }
};
