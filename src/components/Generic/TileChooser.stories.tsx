import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { User } from 'lucide-react';
import { TileChooser } from './TileChooser';

const meta: Meta<typeof TileChooser> = {
  title: 'UI/Molecules/TileChooser',
  component: TileChooser,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof TileChooser>;

const sampleItems = [
  { id: 1, name: 'John Smith', role: 'Senior Software Engineer', team: 'Backend' },
  { id: 2, name: 'Sarah Chen', role: 'DevOps Lead', team: 'Infrastructure' },
  { id: 3, name: 'Mike Johnson', role: 'Frontend Architect', team: 'Frontend' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    selectedItem: null,
    onSelect: action('onSelect'),
    title: 'Select Team Member',
    renderItem: (item) => (
      <>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">{item.name}</span>
        </div>
        <p className="text-gray-500">{item.role} • {item.team}</p>
      </>
    ),
  },
};

export const WithSelection: Story = {
  args: {
    ...Default.args,
    selectedItem: sampleItems[1],
  },
};
