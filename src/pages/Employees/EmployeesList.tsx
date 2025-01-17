import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, BookHeart } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { useNotifications } from '../../contexts/NotificationContext';
import { RecentlyViewedEmployees } from './TODO-RecentlyViewedEmployees';
import { deleteEmployee, getEmployees } from '../../api/EmployeeApi.axios';
import { Button } from '../../components/Generic/Button';
import { Employee } from '../../contract-types/data-contracts';
import { EmployeesSearchBar } from './EmployeesSearchBar';
import type { EmployeeSearchFilters } from './EmployeeSearchFilters';
import { EmployeeCard } from './EmployeeCard';
import { Sidebar } from '../../components/Generic/Sidebar';
import { H1 } from '../../components/Typography/Headings';
import { FlexText } from '../../components/Typography/FlexText';
import { Text } from '../../components/Typography/Text';

export function EmployeesList() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<EmployeeSearchFilters>({
    searchTerm: '',
    departments: [],
    skills: '',
    minSalary: undefined,
    maxSalary: undefined,
    skillsFiltering: 'ANY',
  });

  const { data: employees, isFetching } = useQuery({
    queryKey: ['employees', filters],
    queryFn: () => getEmployees({
      employeeName: filters.searchTerm,
      departmentId: filters.departments[0],
      skills: filters.skills,
      skillsFiltering: filters.skillsFiltering,
      salaryFrom: filters.minSalary?.toString(),
      salaryTo: filters.maxSalary?.toString()
    }),
    placeholderData: (prev) => prev
  });

  const deleteMutation = useMutation({
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


  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(collapsed => !collapsed)
  }

  return (
    <div className='px-2 py-2'>
      <div className="flex justify-between items-center mb-6">
        <FlexText>
          <H1>Employees</H1>
          {employees && <Text>({employees.length} results)</Text>}
        </FlexText>
        <Button
          icon={Plus}
          onClick={() => navigate('/employees/new')}
          className="flex items-center space-x-2"
        >
          Add Employee
        </Button>
      </div>

      <Sidebar
        trigger={
          <h3 className="mb-3 text-purple-600 cursor-auto">
            <BookHeart className='text-3xl cursor-auto' onClick={toggleSidebarCollapsed} /> Recently Viewed
          </h3>
        }
      >
        <RecentlyViewedEmployees />
      </Sidebar>

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
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onView={() => navigate(`/employees/${employee.id}`)}
              onEdit={() => navigate(`/employees/${employee.id}/edit`)}
              onDelete={() => deleteMutation.mutate(employee.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}