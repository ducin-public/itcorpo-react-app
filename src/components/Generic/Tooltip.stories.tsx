import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Tooltip, TooltipDirection } from './Tooltip';
import { PlusIcon } from 'lucide-react';

const meta = {
  title: 'UI/Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const AllDirections: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4 w-[500px] h-[300px]">
      {/* Top row */}
      <div className="col-start-2">
        <Tooltip direction={TooltipDirection.TOP_LEFT} content="Top Left tooltip">
          <Button>↖</Button>
        </Tooltip>
      </div>
      <div>
        <Tooltip direction={TooltipDirection.TOP} content="Top tooltip">
          <Button>↑</Button>
        </Tooltip>
      </div>
      <div>
        <Tooltip direction={TooltipDirection.TOP_RIGHT} content="Top Right tooltip">
          <Button>↗</Button>
        </Tooltip>
      </div>

      {/* Middle row */}
      <div className="col-start-1 self-center">
        <Tooltip direction={TooltipDirection.LEFT} content="Left tooltip">
          <Button>←</Button>
        </Tooltip>
      </div>
      <div className="col-start-5 self-center">
        <Tooltip direction={TooltipDirection.RIGHT} content="Right tooltip">
          <Button>→</Button>
        </Tooltip>
      </div>

      {/* Bottom row */}
      <div className="col-start-2 self-end">
        <Tooltip direction={TooltipDirection.BOTTOM_LEFT} content="Bottom Left tooltip">
          <Button>↙</Button>
        </Tooltip>
      </div>
      <div className="self-end">
        <Tooltip direction={TooltipDirection.BOTTOM} content="Bottom tooltip">
          <Button>↓</Button>
        </Tooltip>
      </div>
      <div className="self-end">
        <Tooltip direction={TooltipDirection.BOTTOM_RIGHT} content="Bottom Right tooltip">
          <Button>↘</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Tooltip size="SMALL" content="Small tooltip - perfect for short messages and labels">
        <Button>Small Tooltip</Button>
      </Tooltip>
      <Tooltip 
        size="MEDIUM"
        content="Medium tooltip - good for descriptions and short documentation. This tooltip can contain multiple sentences and explains concepts in more detail."
      >
        <Button>Medium Tooltip</Button>
      </Tooltip>
      <Tooltip
        size="LARGE"
        content={
          <div>
            <h3 className="font-bold mb-2">Large Tooltip - Documentation</h3>
            <p className="mb-2">Perfect for detailed documentation and complex explanations. Can contain multiple paragraphs and structured content.</p>
            <ul className="list-disc ml-4">
              <li>Supports rich content formatting</li>
              <li>Can include technical specifications</li>
              <li>Ideal for deployment instructions</li>
              <li>Can show detailed error messages</li>
            </ul>
          </div>
        }
      >
        <Button>Large Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const ProjectInfo: Story = {
  args: {
    content: (
      <div>
        <div className="font-semibold mb-1">Project: Cloud Migration</div>
        <div className="text-xs text-gray-600">
          Budget: $250,000<br />
          Team size: 8 developers<br />
          Stack: AWS, Kubernetes, Terraform
        </div>
      </div>
    ),
    children: <Button>Project Details</Button>,
  },
};

export const TechStackInfo: Story = {
  args: {
    content: (
      <div className="text-sm">
        <span className="font-medium">Required skills:</span>
        <ul className="list-disc ml-4 mt-1 text-xs">
          <li>React.js</li>
          <li>TypeScript</li>
          <li>Node.js</li>
        </ul>
      </div>
    ),
    children: <Button>Tech Stack</Button>,
  },
};

export const BudgetWarning: Story = {
  args: {
    content: "Project is over budget by 15%. Click to view detailed spending report.",
    children: <Button variant="WARNING">Budget Alert</Button>,
  },
};

export const WithLongContent: Story = {
  args: {
    content: "This microservice handles user authentication and authorization, integrated with Azure AD. It processes approximately 50k requests per day with 99.99% uptime.",
    children: <Button>Service Info</Button>,
  },
};

export const TooltipDemo = () => {
  return (
    <Tooltip content="Add new deployment configuration">
      <button className="inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
        <PlusIcon />
      </button>
    </Tooltip>
  );
};