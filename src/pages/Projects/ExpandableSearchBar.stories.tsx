import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableSearchBar } from './ExpandableSearchBar';
import { TextInput } from '../../components/Forms/TextInput';

const meta = {
  title: 'ITCORPO/Molecules/ExpandableSearchBar',
  component: ExpandableSearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: null
  }
} satisfies Meta<typeof ExpandableSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[800px]">
      <ExpandableSearchBar>
        <div className="flex flex-col space-y-4">
          <ExpandableSearchBar.BaseRow>
            <div className="flex-1">
              <TextInput
                label="Technology"
                placeholder="Search by technology..."
                value=""
                onChange={() => {}}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Project Name"
                placeholder="Search by project name..."
                value=""
                onChange={() => {}}
              />
            </div>
            <ExpandableSearchBar.ToggleButton />
          </ExpandableSearchBar.BaseRow>

          <ExpandableSearchBar.ExpandedContent>
            <div className="flex-1">
              <TextInput
                label="Client"
                placeholder="Search by client..."
                value=""
                onChange={() => {}}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Location"
                placeholder="Search by location..."
                value=""
                onChange={() => {}}
              />
            </div>
          </ExpandableSearchBar.ExpandedContent>
        </div>
      </ExpandableSearchBar>
    </div>
  ),
};

export const WithoutExpandedContent: Story = {
  render: () => (
    <div className="w-[800px]">
      <ExpandableSearchBar>
        <ExpandableSearchBar.BaseRow>
          <div className="flex-1">
            <TextInput
              label="Project ID"
              placeholder="Enter project ID..."
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Team Size"
              type="number"
              placeholder="Enter team size..."
              value=""
              onChange={() => {}}
            />
          </div>
        </ExpandableSearchBar.BaseRow>
      </ExpandableSearchBar>
    </div>
  ),
};
