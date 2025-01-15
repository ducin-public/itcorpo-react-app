import React from 'react';
import { ExpenseBar, ExpenseTimelineChart } from './ExpenseTimelineChart';
import { BarChart3 } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { formatCurrency } from '../../contexts/CurrencyContext';

const meta: Meta<typeof ExpenseTimelineChart> = {
  title: 'ITCORPO/WIP-Charts/ExpenseTimelineChart',
  component: ExpenseTimelineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExpenseTimelineChart>;

const sampleData: ExpenseBar[] = [
    {
      date: '2023-01-15',
      amount: 1500,
      title: 'Development Tools License',
      status: 'ACTIVE'
    },
    {
      date: '2023-02-01',
      amount: 2300,
      title: 'Cloud Infrastructure',
      status: 'COMPLETED'
    },
    {
      date: '2023-03-10',
      amount: 800,
      title: 'Training Materials',
      status: 'ON_HOLD'
    },
    {
      date: '2023-04-05',
      amount: 3200,
      title: 'Project Hardware',
      status: 'PLANNING'
    },
    {
      date: '2023-05-20',
      amount: 1800,
      title: 'Software Subscriptions',
      status: 'ACTIVE',
    },
    {
      date: '2023-06-15',
      amount: 2700,
      title: 'Conference Tickets',
      status: 'COMPLETED',
    },
    {
      date: '2023-07-01',
      amount: 950,
      title: 'Office Supplies',
      status: 'ON_HOLD',
    },
    {
      date: '2023-08-10',
      amount: 4100,
      title: 'Team Building Event',
      status: 'PLANNING',
    }
  ];

export const Default: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-800">Expense Timeline</h1>
        </div>
        <p className="text-slate-600">Track your expenses over time with detailed insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries({
          'Total Expenses': sampleData.reduce((sum, item) => sum + item.amount, 0),
          'Completed': sampleData.filter(item => item.status === 'COMPLETED')
            .reduce((sum, item) => sum + item.amount, 0),
          'On hold': sampleData.filter(item => item.status === 'ON_HOLD')
            .reduce((sum, item) => sum + item.amount, 0),
        }).map(([label, value]) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-sm font-medium text-slate-600 mb-1">{label}</h3>
            <p className="text-2xl font-bold text-slate-800">
              {formatCurrency(value)}
            </p>
          </div>
        ))}
      </div>
      
      <ExpenseTimelineChart data={sampleData} height={400} />
    </div>
  )
};