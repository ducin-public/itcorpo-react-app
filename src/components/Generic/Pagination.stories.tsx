import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import { Pagination } from './Pagination';
import { getArgsPropsOrDie } from '../story-utils';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: action('onPageChange'),
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = (args: Story['args']) => {
  const [page, setPage] = useState(args?.currentPage || 1);
  const totalPages = getArgsPropsOrDie(args, 'totalPages');
  return (
    <Pagination
      {...args}
      totalPages={totalPages}
      currentPage={page}
      onPageChange={(newPage) => {
        setPage(newPage);
        action('onPageChange')(newPage);
      }}
    />
  );
};

export const Default: Story = {
  render: PaginationWithState,
};

export const WithCustomSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Pagination currentPage={3} totalPages={10} size="SMALL" onPageChange={action('onPageChange')} />
      <Pagination currentPage={3} totalPages={10} size="MEDIUM" onPageChange={action('onPageChange')} />
      <Pagination currentPage={3} totalPages={10} size="LARGE" onPageChange={action('onPageChange')} />
    </div>
  ),
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const DisabledState: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};
