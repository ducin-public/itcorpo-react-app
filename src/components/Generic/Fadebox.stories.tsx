import type { Meta, StoryObj } from '@storybook/react';
import { Fadebox } from './Fadebox';

const meta = {
  title: 'ITCORPO/Organisms/Fadebox',
  component: Fadebox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Fadebox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="p-4">Basic content in a fadebox</div>,
  },
};

export const WithTechStack: Story = {
  args: {
    children: (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Project Tech Stack</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="font-medium w-24">Frontend:</span>
            <span>React, TypeScript</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Backend:</span>
            <span>Node.js, Express</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Database:</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    children: <div className="p-4">This content will be faded while loading</div>,
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Sprint Review</h3>
          <span className="text-gray-500">Sprint #24</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2">
            <li>Implemented new authentication flow</li>
            <li>Optimized database queries</li>
            <li>Released mobile responsive design</li>
          </ul>
        </div>
      </div>
    ),
  },
};
