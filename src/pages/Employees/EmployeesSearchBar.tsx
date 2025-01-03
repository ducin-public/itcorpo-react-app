import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

import { MultiSelect } from '../../components/Forms/MultiSelect';
import { getDepartments } from '../../api/DepartmentApi.axios';
import type { EmployeeSearchCriteria } from './EmployeeSearchCriteria';
import { ExpandableSearchBar } from '../Projects/ExpandableSearchBar';
import { TextInput } from '../../components/Forms/TextInput';

interface Props {
  onFiltersChange: (filters: EmployeeSearchCriteria) => void;
  filters: EmployeeSearchCriteria;
}

export function EmployeesSearchBar({ onFiltersChange, filters }: Props) {
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
            <TextInput
                label='Employee Name'
                value={filters.searchTerm || ''}
                placeholder="Search employees..."
                onChange={(searchTerm) => onFiltersChange({ ...filters, searchTerm })}
            />
            <ExpandableSearchBar.ToggleButton />
        </ExpandableSearchBar.BaseRow>
      
      <ExpandableSearchBar.ExpandedContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departments
            </label>
            <MultiSelect
              label="Departments"
              options={departmentOptions}
              value={filters.departments}
              onChange={(departments) => onFiltersChange({ ...filters, departments })}
              placeholder="Select departments..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Salary
              </label>
              <input
                type="number"
                value={filters.minSalary || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  minSalary: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Min salary..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Salary
              </label>
              <input
                type="number"
                value={filters.maxSalary || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  maxSalary: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Max salary..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={filters.skills}
              onChange={(e) => onFiltersChange({ ...filters, skills: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="React, TypeScript, Node.js..."
            />
          </div>
        </div>
      </ExpandableSearchBar.ExpandedContent>
    </ExpandableSearchBar>
  );
}
