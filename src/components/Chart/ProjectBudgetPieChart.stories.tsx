import type { Meta, StoryObj } from '@storybook/react';
import { ProjectBudgetPieChart } from './ProjectBudgetPieChart';

const meta: Meta<typeof ProjectBudgetPieChart> = {
  title: 'ITCORPO/WIP-Charts/ProjectBudgetPieChart',
  component: ProjectBudgetPieChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectBudgetPieChart>;

const projectBudgetData = [
  {
    projectName: "Cloud Migration",
    budget: 50000,
    spent: 32000,
    status: 'ACTIVE' as const,
  },
  {
    projectName: "Mobile App Development",
    budget: 75000,
    spent: 75000,
    status: 'COMPLETED' as const,
  },
  {
    projectName: "Security Audit",
    budget: 25000,
    spent: 5000,
    status: 'ON_HOLD' as const,
  },
  {
    projectName: "AI Integration",
    budget: 100000,
    spent: 45000,
    status: 'ACTIVE' as const,
  },
  {
    projectName: "DevOps Automation",
    budget: 60000,
    spent: 58000,
    status: 'COMPLETED' as const,
  }
];

export const Default: Story = {
  args: {
    data: projectBudgetData,
    height: 500,
    innerRadius: 85,
    showLegend: true,
    legendPosition: "right",
    animate: true,
    animationDuration: 1500,
  },
};
