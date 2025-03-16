import type { Meta, StoryObj } from '@storybook/react';
import { SpinnerOverlay } from './SpinnerOverlay';

const meta = {
  title: 'UI/Layout/SpinnerOverlay',
  component: SpinnerOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    overlay: true,
    size: 'MEDIUM',
    align: 'CENTER',
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] h-[300px] border rounded-lg p-4">
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof SpinnerOverlay>;

export default meta;
type Story = StoryObj<typeof SpinnerOverlay>;

const ExampleContent = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Project Details</h3>
    <p>This is an example of content that might be loading. The overlay will appear on top of this content when the data is being fetched.</p>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-gray-100 rounded">
        <h4 className="font-medium">Budget</h4>
        <p>$150,000</p>
      </div>
      <div className="p-4 bg-gray-100 rounded">
        <h4 className="font-medium">Team Size</h4>
        <p>8 developers</p>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <ExampleContent />,
  },
};

export const WithOverlay: Story = {
  args: {
    overlay: true,
    children: <ExampleContent />,
  },
};

export const SmallSpinner: Story = {
  args: {
    overlay: true,
    size: 'SMALL',
    children: <ExampleContent />,
  },
};

export const LargeSpinner: Story = {
  args: {
    overlay: true,
    size: 'LARGE',
    children: <ExampleContent />,
  },
};
