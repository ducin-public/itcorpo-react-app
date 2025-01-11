import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { MultiSelect } from '../../components/Forms/MultiSelect';
import { NumberRangeInput } from '../../components/Forms/NumberRangeInput';
import { ExpandableSearchBar } from '../../components/Generic/ExpandableSearchBar';
import { getDepartments } from '../../api/DepartmentApi.axios';
import type { EmployeeSearchFilters } from './EmployeeSearchFilters';
import { TextInput } from '../../components/Forms/TextInput';

interface EmployeesSearchBarProps {
  onFiltersChange: (filters: EmployeeSearchFilters) => void;
  filters: EmployeeSearchFilters;
}

export function EmployeesSearchBar({ onFiltersChange, filters }: EmployeesSearchBarProps) {
  const { data: departments = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });

  const departmentOptions = departments.map(dept => ({
    label: dept.name,
    value: dept.id.toString()
  }));

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
        <div className="space-y-4">
          <NumberRangeInput
            label="Salary Range"
            value={{
              from: filters.minSalary || 0,
              to: filters.maxSalary || 0
            }}
            onChange={({ from, to }) => onFiltersChange({
              ...filters,
              minSalary: from || undefined,
              maxSalary: to || undefined
            })}
            fromPlaceholder="Min salary..."
            toPlaceholder="Max salary..."
            prefix="$"
          />

          <TextInput
            label="Skills (comma separated)"
            value={filters.skills}
            onChange={(value) => onFiltersChange({ ...filters, skills: value })}
            placeholder="React, TypeScript, Node.js..."
          />
        </div>
      </ExpandableSearchBar.ExpandedContent>
    </ExpandableSearchBar>
  );
}
