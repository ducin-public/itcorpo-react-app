import React, { useState } from 'react';

import { MultiSelect } from '../../components/Forms/MultiSelect';
import { TextInput } from '../../components/Forms/TextInput';
import { projectStatusOptions } from './ProjectStatus';
import { type ProjectSearchFilters } from './ProjectSearchFilters';
import { ProjectStatus } from '../../contract-types/data-contracts';
import { ExpandableSearchBar } from '../../components/Generic/ExpandableSearchBar';

interface ProjectSearchBarProps {
  onCriteriaUpdate: (criteria: ProjectSearchFilters) => void;
}

export function ProjectSearchBar({ onCriteriaUpdate }: ProjectSearchBarProps) {
  const [criteria, setCriteria] = useState<ProjectSearchFilters>({
    statuses: [],
  });

  const updateCriteria = (updates: Partial<ProjectSearchFilters>) => {
    const newCriteria = { ...criteria, ...updates };
    setCriteria(newCriteria);
    onCriteriaUpdate(newCriteria);
  };

  return (
    <ExpandableSearchBar>
      <div className="flex flex-col space-y-4">
        <ExpandableSearchBar.BaseRow>
          <div className="flex-1">
            <TextInput
              label="Project Name"
              value={criteria.projectName || ''}
              onChange={(value) => updateCriteria({ projectName: value })}
              placeholder="Search by project name..."
            />
          </div>
          <div className="flex-1">
            <MultiSelect
              label="Status"
              options={projectStatusOptions}
              value={criteria.statuses}
              onChange={(value) => updateCriteria({ statuses: value as ProjectStatus[] })}
              placeholder="Select statuses..."
            />
          </div>
          <ExpandableSearchBar.ToggleButton />
        </ExpandableSearchBar.BaseRow>

        <ExpandableSearchBar.ExpandedContent>
          <div className="flex-1">
            <TextInput
              label="Team Member"
              value={criteria.teamMemberName || ''}
              onChange={(value) => updateCriteria({ teamMemberName: value })}
              placeholder="Search by team member name..."
            />
          </div>
          <div className="flex-1 flex space-x-4">
            <div className="flex-1">
              <TextInput
                label="Min Budget"
                type="number"
                value={criteria.budgetMin?.toString() || ''}
                onChange={(value) => updateCriteria({ budgetMin: value ? Number(value) : undefined })}
                placeholder="Min..."
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Max Budget"
                type="number"
                value={criteria.budgetMax?.toString() || ''}
                onChange={(value) => updateCriteria({ budgetMax: value ? Number(value) : undefined })}
                placeholder="Max..."
              />
            </div>
          </div>
        </ExpandableSearchBar.ExpandedContent>
      </div>
    </ExpandableSearchBar>
  );
}
