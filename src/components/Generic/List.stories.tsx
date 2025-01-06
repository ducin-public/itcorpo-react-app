import type { Meta, StoryObj } from '@storybook/react';
import { Tornado, Award, Clock } from 'lucide-react';

import { List } from './List';
import { Paragraph } from '../Typography/Paragraph';

type Treatment = string;
type Schedule = {
  time: string;
  description: string;
};
type Achievement = {
  title: string;
  description: string;
  details: string;
};

const meta = {
  title: 'UI/Molecules/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof List>;

export const SingleLineItems: StoryObj<typeof List<Treatment>> = {
  args: {
    bulletIcon: Tornado,
    items: [
      'System Architecture Review',
      'Code Quality Assessment',
      'Security Audit',
      'Performance Optimization',
    ],
    renderItem: (item) => (
      <Paragraph size="SMALL">{item}</Paragraph>
    ),
  },
};

export const DoubleLineItems: StoryObj<typeof List<Schedule>> = {
  args: {
    bulletIcon: Clock,
    items: [
      { time: '9:00 AM', description: 'Daily Standup' },
      { time: '10:30 AM', description: 'Sprint Planning' },
      { time: '2:00 PM', description: 'Technical Review' },
    ],
    renderItem: (item) => (
      <div>
        <Paragraph size="SMALL" className="font-medium">{item.time}</Paragraph>
        <Paragraph size="SMALL" className="text-gray-600">{item.description}</Paragraph>
      </div>
    ),
  },
};

export const MultipleLineItems: StoryObj<typeof List<Achievement>> = {
  args: {
    bulletIcon: Award,
    items: [
      {
        title: 'Best DevOps Implementation 2023',
        description: 'Awarded by Cloud Excellence Institute',
        details: 'Recognition for outstanding CI/CD pipeline and cloud infrastructure optimization.'
      },
      {
        title: 'Innovation Excellence Award',
        description: 'For pioneering microservices architecture',
        details: 'Successfully transformed monolithic application into scalable microservices.'
      },
    ],
    renderItem: (item) => (
      <div>
        <Paragraph size="MEDIUM" className="font-semibold">{item.title}</Paragraph>
        <Paragraph size="SMALL" className="text-gray-600">{item.description}</Paragraph>
        <Paragraph size="SMALL" className="text-gray-500 mt-1">{item.details}</Paragraph>
      </div>
    ),
  },
};
