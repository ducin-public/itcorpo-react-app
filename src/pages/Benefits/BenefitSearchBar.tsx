import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { ExpandableSearchBar } from '../../components/Generic/ExpandableSearchBar';
import { TextInput } from '../../components/Forms/TextInput';
import { MultiSelect } from '../../components/Forms/MultiSelect';
import { Dropdown } from '../../components/Forms/Dropdown';
import { DateRangePicker } from '../../components/Forms/DateRangePicker';
import { getEmployees } from '../../api/EmployeeApi.axios';
import { BenefitSubscriptionSearchStatusDict, type BenefitSearchFilters } from './BenefitSearchFilters';
import type { Employee } from '../../contract-types/data-contracts';
import { NumberRangeInput } from '../../components/Forms/NumberRangeInput';
import type { BenefitCategory } from '../../contract-types/data-contracts';

interface BenefitSearchBarProps {
  searchState: BenefitSearchFilters;
  onCriteriaUpdate: (criteria: BenefitSearchFilters) => void;
}

const categoryLabels: Record<BenefitCategory, string> = {
  'HEALTHCARE': 'Healthcare & Medical',
  'SPORT_WELLNESS': 'Sport & Wellness',
  'LUNCH_FOOD': 'Lunch & Food',
  'CULTURE_RECREATION': 'Culture & Recreation',
};

const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
  value,
  label,
}));

export function BenefitSearchBar({ searchState, onCriteriaUpdate }: BenefitSearchBarProps) {
  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployees()
  });

  const employeeOptions = employees.map((emp: Employee) => ({
    value: String(emp.id),
    label: `${emp.firstName} ${emp.lastName}`
  }));

  const handleChange = (updates: Partial<BenefitSearchFilters>) => {
    const newCriteria = { ...searchState, ...updates };
    onCriteriaUpdate(newCriteria);
  };

  return (
    <div className="space-y-4">
      <ExpandableSearchBar>
        <ExpandableSearchBar.BaseRow>
          <TextInput
            label='Service Name'
            placeholder="Search by service name..."
            value={searchState.serviceName || ''}
            onChange={(serviceName) => handleChange({ serviceName })}
          />
          <MultiSelect
            label="Categories"
            placeholder="Select categories..."
            options={categoryOptions}
            value={searchState.selectedCategories || []}
            onChange={(selectedCategories) => handleChange({ 
              selectedCategories: selectedCategories as BenefitCategory[] 
            })}
          />
          <MultiSelect
            label="Employees"
            placeholder="Select employees..."
            options={employeeOptions}
            value={searchState.selectedEmployees?.map(String) || []}
            onChange={(selectedEmployees) => handleChange({ selectedEmployees })}
          />
          <ExpandableSearchBar.ToggleButton />
        </ExpandableSearchBar.BaseRow>

        <ExpandableSearchBar.ExpandedContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberRangeInput
                    label="Fee Range"
                    value={searchState.feeRange}
                    onChange={(range) => handleChange({ 
                        feeRange: range
                    })}
                />
                <Dropdown
                    label="Status"
                    placeholder="Select status..."
                    items={BenefitSubscriptionSearchStatusDict}
                    value={searchState.selectedStatus || ''}
                    onChanged={(value) => handleChange({ 
                        selectedStatus: value as (keyof typeof BenefitSubscriptionSearchStatusDict)
                    })}
                />
            </div>
        </ExpandableSearchBar.ExpandedContent>
      </ExpandableSearchBar>
    </div>
  );
}
