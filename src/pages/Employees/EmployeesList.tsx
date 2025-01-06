import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, BookHeart } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { useNotifications } from '../../contexts/NotificationContext';
import { RecentlyViewedEmployees } from './TODO-RecentlyViewedEmployees';
import { deleteEmployee, getEmployees } from '../../api/EmployeeApi.axios';
import { Button } from '../../components/Generic/Button';
import { Employee } from '../../api/data-contracts';
import { EmployeesSearchBar } from './EmployeesSearchBar';
import type { EmployeeSearchCriteria } from './EmployeeSearchCriteria';
import { EmployeeCard } from './EmployeeCard';
import { Sidebar } from '../../components/Generic/Sidebar';

export function EmployeesList() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<EmployeeSearchCriteria>({
    searchTerm: '',
    departments: [],
    skills: '',
    minSalary: undefined,
    maxSalary: undefined
  });

  const { data: employees, isFetching } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees
  });

  const deleteMutation = useMutation({
    mutationFn: (id: Employee['id']) => deleteEmployee(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.removeQueries({ queryKey: ['employees', id] });
      addNotification('notice', 'Employee successfully deleted');
    },
    onError: (err) => {
      addNotification('error', `Failed to delete employee: ${err.message}`);
    }
  });

  const filteredEmployees = employees?.filter(employee => {
    const matchesSearch = `${employee.firstName} ${employee.lastName} ${employee.email}`
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());

    const matchesDepartment = filters.departments.length === 0 || 
      filters.departments.includes(employee.department);

    const matchesSalary = (!filters.minSalary || employee.salary >= filters.minSalary) &&
      (!filters.maxSalary || employee.salary <= filters.maxSalary);

    const matchesSkills = !filters.skills || 
      filters.skills.split(',').every(skill => 
        employee.skills.includes(skill.trim())
      );

    return matchesSearch && matchesDepartment && matchesSalary && matchesSkills;
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(collapsed => !collapsed)
  }

  return (
    <div className='px-2 py-2'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <Button
          onClick={() => navigate('/employees/new')}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
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
          {filteredEmployees?.map((employee) => (
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