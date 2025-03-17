import { ExpandableSearchBar } from '../../../components/Generic/ExpandableSearchBar';
import { TextInput } from '../../../components/Forms/TextInput';
import { MultiSelect } from '../../../components/Forms/MultiSelect';
import { Dropdown } from '../../../components/Forms/Dropdown';
import { BenefitSubscriptionSearchStatusDict, type BenefitSearchFilters } from './BenefitSearchFilters';
import { NumberRangeInput } from '../../../components/Forms/NumberRangeInput';
import type { BenefitCategory, EmployeeSearchFeed } from '../../../contract-types/data-contracts';
import { useEffect, useState } from 'react';
import { getEmployeesSearchFeed } from '../../../api/EmployeeApi.axios';

interface BenefitSearchBarProps {
  searchState: BenefitSearchFilters;
  onCriteriaUpdate: (criteria: BenefitSearchFilters) => void;
}

const categories: Record<BenefitCategory, string> = {
  'HEALTHCARE': 'Healthcare & Medical',
  'SPORT_WELLNESS': 'Sport & Wellness',
  'LUNCH_FOOD': 'Lunch & Food',
  'CULTURE_RECREATION': 'Culture & Recreation',
};

export function BenefitSearchBar({ searchState, onCriteriaUpdate }: BenefitSearchBarProps) {
  const [employees, setEmployees] = useState<EmployeeSearchFeed[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    getEmployeesSearchFeed().then((employees) => {

      setEmployees(employees);
      setIsFetching(false);
    });
  }, [])

  const handleChange = (updates: Partial<BenefitSearchFilters>) => {
    const newCriteria = { ...searchState, ...updates };
    onCriteriaUpdate(newCriteria);
  };

  const employeesOptions = Object.fromEntries(
    employees.map(emp => ([String(emp.id), emp.name]))
  );

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
            options={categories}
            value={searchState.categories || []}
            onChange={(selectedCategories) => handleChange({ 
              categories: selectedCategories as BenefitCategory[] 
            })}
          />
          <Dropdown
            label="Beneficiary Employee"
            placeholder="Select employees..."
            options={employeesOptions}
            value={searchState.beneficiaryEmployee}
            onChange={(beneficiaryEmployee) => handleChange({ beneficiaryEmployee })}
          />
          <ExpandableSearchBar.ToggleButton />
        </ExpandableSearchBar.BaseRow>

        <ExpandableSearchBar.ExpandedContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberRangeInput
                    label="Fee Range"
                    step={100}
                    value={searchState.feeRange}
                    onChange={(range) => handleChange({ 
                        feeRange: range
                    })}
                />
                <Dropdown
                    label="Status"
                    placeholder="Select status..."
                    options={BenefitSubscriptionSearchStatusDict}
                    value={searchState.selectedStatus || ''}
                    onChange={(value) => handleChange({ 
                        selectedStatus: value as (keyof typeof BenefitSubscriptionSearchStatusDict)
                    })}
                />
            </div>
        </ExpandableSearchBar.ExpandedContent>
      </ExpandableSearchBar>
    </div>
  );
}
