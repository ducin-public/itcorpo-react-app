import type { Meta, StoryObj } from '@storybook/react';
import { BenefitDistributionChart } from './BenefitDistributionChart';

const meta: Meta<typeof BenefitDistributionChart> = {
    component: BenefitDistributionChart,
    title: 'ITCORPO/WIP-Charts/BenefitDistributionChart',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BenefitDistributionChart>;

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

export const Default: Story = {
    args: {
        data: [
            { name: 'Healthcare Package', value: 500 },
            { name: 'Learning Budget', value: 2000 },
            { name: 'Gym Membership', value: 100 },
            { name: 'Remote Work Setup', value: 1000 },
            { name: 'Conference Budget', value: 1500 },
            { name: 'Team Building', value: 800 },
        ],
        width: 600,
        height: 400,
    },
};
