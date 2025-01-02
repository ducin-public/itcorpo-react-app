import type { Meta, StoryObj } from '@storybook/react';
import { ProgressMeter } from './ProgressMeter';
import { Button } from './Button';
import { useState } from 'react';

const meta = {
  title: 'UI/Atoms/ProgressMeter',
  component: ProgressMeter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 75,
    label: 'Progress'
  },
} satisfies Meta<typeof ProgressMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <ProgressMeter size="SMALL" value={75} label="Small" />
      <ProgressMeter size="MEDIUM" value={75} label="Medium" />
      <ProgressMeter size="LARGE" value={75} label="Large" />
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <ProgressMeter fill="SOLID" value={75} label="Primary" />
      <ProgressMeter fill="GRADIENT" value={75} label="Gradient" />
    </div>
  )
};

export const WithoutLabel: Story = {
  args: {
    value: 75,
    showValue: false
  }
};

export const ProgressLevels: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <ProgressMeter value={25} label="Low Progress" />
      <ProgressMeter value={50} label="Medium Progress" />
      <ProgressMeter value={85} label="High Progress" />
    </div>
  )
};

export const Interactive = () => {
  const [progress, setProgress] = useState(75);

  return (
    <div className="w-64 space-y-4">
      <ProgressMeter value={progress} label="Interactive" />
      <div className="flex gap-2">
        <Button
          size="SMALL"
          variant="SECONDARY"
          onClick={() => setProgress(Math.max(0, progress - 5))}
        >
          Decrease
        </Button>
        <Button
          size="SMALL"
          variant="SECONDARY"
          onClick={() => setProgress(Math.min(100, progress + 5))}
        >
          Increase
        </Button>
      </div>
    </div>
  );
};
