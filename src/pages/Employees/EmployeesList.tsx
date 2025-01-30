import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CircleX, LayoutList, Plus, Search } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { useNotifications } from '../../contexts/NotificationContext';
import { deleteEmployee, getEmployees } from '../../api/EmployeeApi.axios';
import { Button } from '../../components/Generic/Button';
import { Employee } from '../../contract-types/data-contracts';
import { EmployeesSearchBar } from './EmployeesSearchBar';
import { emptyEmployeeSearchFilters, type EmployeeSearchFilters } from './EmployeeSearchFilters';
import { EmployeeTile } from './EmployeeTile';
import { H1 } from '../../components/Typography/Headings';
import { FlexText } from '../../components/Typography/FlexText';
import { Text } from '../../components/Typography/Text';
import { ActionButtons } from '../../components/Generic/ActionButtons';
import { EmployeeGroup, employeeGroupDict } from './EmployeeDictionaries';

interface EmployeesListProps {
  group: EmployeeGroup
}

export function EmployeesList({ group }: EmployeesListProps) {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<EmployeeSearchFilters>(emptyEmployeeSearchFilters);

  const { data: employees, isFetching } = useQuery({
    queryKey: ['employees', 'list', { group}, filters],
    queryFn: () => getEmployees({
      group,
      employeeName: filters.searchTerm,
      departmentId: filters.departments[0],
      skills: filters.skills,
      skillsFiltering: filters.skillsFiltering,
      salaryFrom: filters.minSalary?.toString(),
      salaryTo: filters.maxSalary?.toString(),
    }),
    placeholderData: (prev) => prev
  });

  const deleteMutation = useMutation({
    mutationKey: ['employee', 'delete'],
    mutationFn: (employeeId: Employee['id']) => deleteEmployee({ employeeId }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.removeQueries({ queryKey: ['employees', id] });
      addNotification('notice', 'Employee successfully deleted');
    },
    onError: (err) => {
      addNotification('error', `Failed to delete employee: ${err.message}`);
    }
  });

  return (
    <div className='px-2 py-2'>
      <div className="flex justify-between items-center mb-4">
        <FlexText>
          <H1 className='mb-0'>{employeeGroupDict[group]}</H1>
          {employees && <Text>({employees.length} results)</Text>}
        </FlexText>

        <span className='flex space-x-2'>
          <Button
            icon={Plus}
            onClick={() => navigate('/employees/new')}
            fill='OUTLINED'
            className="flex items-center space-x-2"
          >
            Add Employee
          </Button>

          <Button
            icon={CircleX}
            onClick={() => {
              setFilters(emptyEmployeeSearchFilters);
            }}
            fill='OUTLINED'
            className="flex items-center space-x-2"
          >
            Clear Filters
          </Button>
        </span>
      </div>

      <div className="mb-6">
        <EmployeesSearchBar
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      <div className="relative min-h-[200px]">
        {(isFetching || deleteMutation.isPending) && (
          <Spinner size='LARGE' layout='OVERLAY' />
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isFetching ? 'pointer-events-none' : ''}`}>
          {employees?.map((employee) => (
            <EmployeeTile
              key={employee.id}
              employee={employee}
              onEdit={() => navigate(`/employees/${employee.id}/edit`)}
              onDelete={() => deleteMutation.mutate(employee.id)}
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
      </div>
    </div>
  );
}