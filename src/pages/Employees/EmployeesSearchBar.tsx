import { useQuery } from '@tanstack/react-query';

import { MultiSelect } from '../../components/Forms/MultiSelect';
import { NumberRangeInput } from '../../components/Forms/NumberRangeInput';
import { ExpandableSearchBar } from '../../components/Generic/ExpandableSearchBar';
import type { EmployeeSearchFilters } from './EmployeeSearchFilters';
import { TextInput } from '../../components/Forms/TextInput';
import { FilteringChoice } from '../../components/Generic/FilteringChoice';
import { departmentsListQuery } from '../../api/DepartmentQueries';

interface EmployeesSearchBarProps {
  onFiltersChange: (filters: EmployeeSearchFilters) => void;
  filters: EmployeeSearchFilters;
}

export function EmployeesSearchBar({ onFiltersChange, filters }: EmployeesSearchBarProps) {
  const { data: departments = [] } = useQuery(departmentsListQuery);

  const departmentOptions = departments.reduce((acc, department) => {
    acc[department.id] = department.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <ExpandableSearchBar>
        <ExpandableSearchBar.BaseRow>
          <div className="flex flex-1 gap-4">
            <div className="flex-1">
              <TextInput
                  label='Employee Name'
                  value={filters.searchTerm || ''}
                  placeholder="Search employees..."
                  onChange={(searchTerm) => onFiltersChange({ ...filters, searchTerm })}
              />
            </div>
            <div className="flex-1">
              <MultiSelect
                label="Departments"
                options={departmentOptions}
                value={filters.departments}
                onChange={(departments) => onFiltersChange({ ...filters, departments })}
                placeholder="Select departments..."
              />
            </div>
          </div>
          <ExpandableSearchBar.ToggleButton />
        </ExpandableSearchBar.BaseRow>
      
      <ExpandableSearchBar.ExpandedContent>
        <div className="grid grid-cols-2 gap-4">
          <NumberRangeInput
            label="Salary Range"
            value={{ from: filters.minSalary || 0, to: filters.maxSalary || 0 }}
            onChange={({ from, to }) => onFiltersChange({ ...filters, minSalary: from || undefined, maxSalary: to || undefined })}
            fromPlaceholder="Min salary..." toPlaceholder="Max salary..." prefix="$"
          />
          <div className="flex gap-4">
            <TextInput
              label="Skills (comma separated)"
              value={filters.skills}
              onChange={(value) => onFiltersChange({ ...filters, skills: value })}
              placeholder="React, TypeScript, Node.js..."
            />
            <FilteringChoice
              label="Skills Filtering"
              value={filters.skillsFiltering}
              onChange={(value) => onFiltersChange({ ...filters, skillsFiltering: value })}
            />
          </div>
        </div>
      </ExpandableSearchBar.ExpandedContent>
    </ExpandableSearchBar>
  );
}
