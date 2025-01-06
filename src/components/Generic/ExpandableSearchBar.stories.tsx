import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

import { ExpandableSearchBar } from './ExpandableSearchBar';
import { TextInput } from '../Forms/TextInput';
import { Autocomplete } from '../Forms/Autocomplete';
import { MultiSelect } from '../Forms/MultiSelect';

const mockEngineers = [
  { id: '1', label: 'Sarah Thompson', specialization: 'Frontend Lead' },
  { id: '2', label: 'Michael Chen', specialization: 'DevOps Engineer' },
  { id: '3', label: 'Emily Wilson', specialization: 'Full Stack Developer' },
  { id: '4', label: 'James Miller', specialization: 'Solution Architect' },
];

const mockTechnologies = [
  { label: 'React Development', value: 'react' },
  { label: 'Cloud Architecture', value: 'cloud' },
  { label: 'API Integration', value: 'api' },
  { label: 'DevOps Pipeline', value: 'devops' },
  { label: 'Database Design', value: 'database' },
  { label: 'Security Implementation', value: 'security' },
];

const meta = {
  title: 'UI/Organisms/ExpandableSearchBar',
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
                label="Project Name"
                placeholder="Search by project name..."
                value=""
                onChange={action('onChange')}
              />
            </div>
            <div className="flex-1">
              <Autocomplete
                label="Team Lead"
                placeholder="Select team lead..."
                options={mockEngineers}
                onSelect={action('onEngineerChange')}
              />
            </div>
            <ExpandableSearchBar.ToggleButton />
          </ExpandableSearchBar.BaseRow>

          <ExpandableSearchBar.ExpandedContent>
            <div className="flex-1">
              <MultiSelect
                label="Technologies"
                placeholder="Select technologies..."
                options={mockTechnologies}
                value={[]}
                onChange={action('onTechnologiesChange')}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Project Start Date"
                type="date"
                placeholder="Search by start date..."
                value=""
                onChange={action('onChange')}
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
              onChange={action('onChange')}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Client Name"
              placeholder="Enter client name..."
              value=""
              onChange={action('onChange')}
            />
          </div>
        </ExpandableSearchBar.BaseRow>
      </ExpandableSearchBar>
    </div>
  ),
};

type SearchState = {
  projectName: string;
  engineer: typeof mockEngineers[0] | null;
  technologies: string[];
  startDate: string;
};

const SearchWrapper = () => {
  const [search, setSearch] = useState<SearchState>({
    projectName: '',
    engineer: null,
    technologies: [],
    startDate: '',
  });

  return (
    <div className="w-[800px]">
      <ExpandableSearchBar>
        <div className="flex flex-col space-y-4">
          <ExpandableSearchBar.BaseRow>
            <div className="flex-1">
              <TextInput
                label="Project Name"
                placeholder="Search by project name..."
                value={search.projectName}
                onChange={(value) => {
                  setSearch(prev => {
                    const updated = { ...prev, projectName: value };
                    action('searchStateChanged')(updated);
                    return updated;
                  });
                }}
              />
            </div>
            <div className="flex-1">
              <Autocomplete
                label="Team Lead"
                placeholder="Select team lead..."
                options={mockEngineers}
                onSelect={(option) => {
                  setSearch(prev => {
                    const engineer = mockEngineers.find(d => d.id === option.id) ?? null;
                    const updated = { ...prev, engineer };
                    action('searchStateChanged')(updated);
                    return updated;
                  });
                }}
              />
            </div>
            <ExpandableSearchBar.ToggleButton />
          </ExpandableSearchBar.BaseRow>

          <ExpandableSearchBar.ExpandedContent>
            <div className="flex-1">
              <MultiSelect
                label="Technologies"
                placeholder="Select technologies..."
                options={mockTechnologies}
                value={search.technologies}
                onChange={(values) => {
                  setSearch(prev => {
                    const updated = { ...prev, technologies: values };
                    action('searchStateChanged')(updated);
                    return updated;
                  });
                }}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Project Start Date"
                type="date"
                placeholder="Search by start date..."
                value={search.startDate}
                onChange={(value) => {
                  setSearch(prev => {
                    const updated = { ...prev, startDate: value };
                    action('searchStateChanged')(updated);
                    return updated;
                  });
                }}
              />
            </div>
          </ExpandableSearchBar.ExpandedContent>
        </div>
      </ExpandableSearchBar>
    </div>
  );
};

export const ExpandableWithState: Story = {
  render: () => <SearchWrapper />,
};
