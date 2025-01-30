import { MultiSelect } from '../../../components/Forms/MultiSelect';
import { TextInput } from '../../../components/Forms/TextInput';
import { projectStatusDict } from '../ProjectStatus';
import { ProjectStatus } from '../../../contract-types/data-contracts';
import { ExpandableSearchBar } from '../../../components/Generic/ExpandableSearchBar';
import { FilteringChoice } from '../../../components/Generic/FilteringChoice';
import { ButtonChoice } from '../../../components/Generic/ButtonChoice';
import { styleConstants, styles } from '../../../components/DesignLanguage';
import { useProjectSearch } from './ProjectSearchContext';

export function ProjectSearchBar() {
  const { params, setFilters, setSorting } = useProjectSearch();

  return (
    <ExpandableSearchBar>
      <div className="flex flex-col space-y-4">
        <ExpandableSearchBar.BaseRow>
          <div className="flex-1">
            <TextInput
              label="Project Name"
              value={params.filters.projectName || ''}
              onChange={(value) => setFilters({ projectName: value })}
              placeholder="Search by project name..."
            />
          </div>
          <div className="flex-1">
            <MultiSelect
              label="Status"
              options={projectStatusDict}
              value={params.filters.statuses}
              onChange={(value) => setFilters({ statuses: value as ProjectStatus[] })}
              placeholder="Select statuses..."
            />
          </div>
          <ExpandableSearchBar.ToggleButton />
        </ExpandableSearchBar.BaseRow>

        <ExpandableSearchBar.ExpandedContent>
          <div className="flex-1">
            <TextInput
              label="Team Members"
              value={params.filters.teamMemberName || ''}
              onChange={(value) => setFilters({ teamMemberName: value })}
              placeholder="Search by team member name..."
            />
          </div>
          <div className="flex-none">
            <FilteringChoice
              value={params.filters.teamMemberFiltering}
              onChange={(value) => setFilters({ teamMemberFiltering: value })}
            />
          </div>
          <div className="flex-1 flex space-x-4">
            <div className="flex-1">
              <TextInput
                label="Min Budget"
                type="number"
                value={params.filters.budgetMin?.toString() || ''}
                onChange={(value) => setFilters({ budgetMin: value ? Number(value) : undefined })}
                placeholder="Min..."
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Max Budget"
                type="number"
                value={params.filters.budgetMax?.toString() || ''}
                onChange={(value) => setFilters({ budgetMax: value ? Number(value) : undefined })}
                placeholder="Max..."
              />
            </div>
          </div>
        </ExpandableSearchBar.ExpandedContent>

        <ExpandableSearchBar.ExpandedContent>
          <div className="flex space-x-4">
            <div className="flex-2">
              <label
                htmlFor="sort-by"
                className={`${styleConstants.LABEL_TEXT_SIZE} ${styles.ACCENT.text} block font-medium`}
              >Sort By</label>
              <ButtonChoice
                id='sort-by'
                options={[
                  { value: 'NAME', label: 'Name' },
                  { value: 'START_DATE', label: 'Start Date' },
                  { value: 'END_DATE', label: 'End Date' },
                  { value: 'STATUS', label: 'Status' },
                  { value: 'TEAM_SIZE', label: 'Team Size' },
                ]}
                size='SMALL'
                value={params.sorting.sortBy || 'NAME'}
                onChange={(value) => setSorting({ sortBy: value })}
              />
            </div>
            <div className="flex-1">
              <label 
                htmlFor="sort-order"
                className={`${styleConstants.LABEL_TEXT_SIZE} ${styles.ACCENT.text} block font-medium`}
              >Sort Order</label>
              <ButtonChoice
                id='sort-order'
                options={[
                  { value: 'ASC', label: '↑ Ascending' },
                  { value: 'DESC', label: '↓ Descending' },
                ]}
                size='SMALL'
                value={params.sorting.sortOrder || 'ASC'}
                onChange={(value) => setSorting({ sortOrder: value })}
              />
            </div>
          </div>
        </ExpandableSearchBar.ExpandedContent>
      </div>
    </ExpandableSearchBar>
  );
}
