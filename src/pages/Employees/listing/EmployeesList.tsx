import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleX, LayoutList, Plus, Search } from 'lucide-react';

import { getEmployees } from '../../../api/EmployeeApi.axios';

import { Employee } from '../../../contract-types/data-contracts';
import { EmployeeSearchBar } from '../search/EmployeeSearchBar';
import { emptyEmployeeSearchFilters, type EmployeeSearchFilters } from '../search/EmployeeSearchFilters';
import { EmployeeTile } from '../EmployeeTile';
import { H1 } from '../../../components/Typography/Headings';
import { FlexText } from '../../../components/Typography/FlexText';
import { Text } from '../../../components/Typography/Text';
import { ActionButtons } from '../../../components/Generic/ActionButtons';
import { EmployeeGroup, employeeGroupDict } from '../EmployeeDictionaries';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';
import { Checkbox } from '../../../components/Forms/Checkbox';
import { formatCurrency } from '../../../contexts/CurrencyContext';

interface EmployeesListProps {
  group: EmployeeGroup
}

export function EmployeesList({ group }: EmployeesListProps) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<EmployeeSearchFilters>(emptyEmployeeSearchFilters);
  const [showExtendedSalary, setShowExtendedSalary] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    getEmployees().then((benefits) => {
      setEmployees(benefits);
      setIsFetching(false);
    });
  }, [])
  

  const calculateTotalSalary = () => {
    if (!employees) return 0;
    return employees.reduce((acc, employee) => acc + (employee.employment.currentSalary || 0), 0);
  };

  const monthlySalary = calculateTotalSalary();
  const quarterlySalary = monthlySalary * 3;
  const yearlySalary = monthlySalary * 12;

  return (
    <div className='px-2 py-2'>
      <div className="flex justify-between items-center mb-4">
        <FlexText>
          <H1 className='mb-0'>{employeeGroupDict[group]}</H1>
          {employees && <Text>({employees.length} results)</Text>}
        </FlexText>

        <ActionButtons
          size="MEDIUM"
          actions={[{
            icon: Plus,
            text: 'Add Employee',
            onClick: () => navigate('/employees/new')
          }, {
            icon: CircleX,
            text: 'Clear All Filters',
            onClick: () => setFilters(emptyEmployeeSearchFilters)
          }]}
        />
      </div>

      <div className="mb-6">
        <EmployeeSearchBar
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-3">
          <Checkbox
            id="show-extended-salary"
            checked={showExtendedSalary}
            onChange={(checked) => setShowExtendedSalary(checked)}
            label="Show extended salary information"
          />
        </div>
          
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <Text className="text-gray-600 text-sm">Monthly Total:</Text>
            <Text className={`font-semibold text-lg`}>
              {formatCurrency(monthlySalary)}
            </Text>
          </div>
          
          {showExtendedSalary && (
            <>
              <div className="bg-gray-50 p-3 rounded-md">
                <Text className="text-gray-600 text-sm">Quarterly Total:</Text>
                <Text className={`font-semibold text-lg`}>
                  {formatCurrency(quarterlySalary)}
                </Text>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <Text className="text-gray-600 text-sm">Yearly Total:</Text>
                <Text className={`font-semibold text-lg`}>
                  {formatCurrency(yearlySalary)}
                </Text>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative min-h-[200px]">
        <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isFetching ? 'pointer-events-none' : ''}`}>
            {employees?.map((employee) => (
              <EmployeeTile
                key={employee.id}
                employee={employee}
                onEdit={() => navigate(`/employees/${employee.id}/edit`)}
                footer={
                  <ActionButtons
                    actions={[{
                      icon: Search,
                      text: 'View Details',
                      onClick: () => navigate(`/employees/${employee.id}/details`)
                    }, {
                      text: 'Projects involved in',
                      icon: LayoutList,
                      onClick: () => navigate(`/employees/${employee.id}/projects`)
                    }]}
                    className="mt-4"
                  />
                }
              />
            ))}
          </div>
        </SpinnerOverlay>
      </div>
    </div>
  );
}