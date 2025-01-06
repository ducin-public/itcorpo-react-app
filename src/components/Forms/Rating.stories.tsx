import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Rating, RatingIcon } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Forms/Rating',
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
      options: Object.values(RatingIcon)
    },
    activeColor: {
      description: 'Color used for active/filled icons',
      control: 'color'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const WithStars: Story = {
  args: {
    value: 3,
    onChange: action('rating changed'),
    icon: RatingIcon.STAR,
    activeColor: '#fbbf24' // gold
  }
};

export const WithHearts: Story = {
  args: {
    value: 4,
    onChange: action('rating changed'),
    icon: RatingIcon.HEART,
    activeColor: '#ef4444' // red-500
  }
};

export const WithPillsForDentalReview: Story = {
  args: {
    value: 2,
    onChange: action('rating changed'),
    icon: RatingIcon.PILL,
    activeColor: '#10b981' // green-500
  }
};

export const WithSunForClinicBrightness: Story = {
  args: {
    value: 4,
    onChange: action('rating changed'),
    icon: RatingIcon.SUN,
    activeColor: '#eab308' // yellow-500
  }
};

export const WithThumbsForSatisfaction: Story = {
  args: {
    value: 3,
    onChange: action('rating changed'),
    icon: RatingIcon.THUMBS_UP,
    activeColor: '#3b82f6' // blue-500
  }
};

export const CustomScale: Story = {
  args: {
    scale: 10,
    value: 7,
    onChange: action('rating changed'),
    icon: RatingIcon.STAR,
    activeColor: '#fbbf24'
  }
};

export const ProjectSatisfaction: Story = {
  args: {
    value: 4,
    onChange: action('rating changed'),
    icon: RatingIcon.STAR,
    activeColor: '#fbbf24',
    scale: 5
  }
};

export const TeamCollaboration: Story = {
  args: {
    value: 4,
    onChange: action('rating changed'),
    icon: RatingIcon.HEART,
    activeColor: '#ef4444',
    scale: 5
  }
};

export const CodeQuality: Story = {
  args: {
    value: 3,
    onChange: action('rating changed'),
    icon: RatingIcon.THUMBS_UP,
    activeColor: '#3b82f6',
    scale: 5
  }
};

export const DeliverySpeed: Story = {
  args: {
    value: 4,
    onChange: action('rating changed'),
    icon: RatingIcon.SUN,
    activeColor: '#eab308',
    scale: 5
  }
};
