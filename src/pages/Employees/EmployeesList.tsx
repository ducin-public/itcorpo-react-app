import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Trash2, Edit, BookHeart } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { useNotifications } from '../../contexts/NotificationContext';
import { RecentlyViewedEmployees } from './RecentlyViewedEmployees';
import { Sidebar } from '../../components/Legacy/sidebar/sidebar';
import { deleteEmployee, getEmployees } from '../../api/EmployeeApi.axios';
import { Button } from '../../components/Generic/Button';
import { Employee } from '../../api/data-contracts';
import { employeeImageURL } from './employeeImageURL';
import { EmployeesSearchBar } from './EmployeesSearchBar';
import type { EmployeeSearchCriteria } from './EmployeeSearchCriteria';

export function EmployeesList() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [filters, setFilters] = useState<EmployeeSearchCriteria>({
    searchTerm: '',
    departments: [],
    skills: '',
    minSalary: undefined,
    maxSalary: undefined
  });

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees
  });

  const filteredEmployees = employees?.filter(employee => {
    const matchesSearch = `${employee.firstName} ${employee.lastName} ${employee.email}`
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());

    const matchesDepartment = filters.departments.length === 0 || 
      filters.departments.includes(employee.departmentId.toString());

    const matchesSalary = (!filters.minSalary || employee.salary >= filters.minSalary) &&
      (!filters.maxSalary || employee.salary <= filters.maxSalary);

    const matchesSkills = !filters.skills || 
      filters.skills.split(',').every(skill => 
        employee.skills.includes(skill.trim())
      );

    return matchesSearch && matchesDepartment && matchesSalary && matchesSkills;
  });

  const handleDelete = async (id: Employee['id']) => {
    try {
      await deleteEmployee(id);
      addNotification('notice', 'Employee successfully deleted');
    } catch (error) {
      addNotification('error', 'Failed to delete employee');
    }
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(collapsed => !collapsed)
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
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
      <h3 className="mb-3 text-blue-600 cursor-auto">
        <BookHeart className='text-3xl cursor-auto' onClick={toggleSidebarCollapsed} /> Recently Viewed
      </h3>
      <Sidebar collapsed={sidebarCollapsed} onCloseClick={toggleSidebarCollapsed}>
        <RecentlyViewedEmployees />
      </Sidebar>

      <div className="mb-6">
        <EmployeesSearchBar
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees?.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onView={() => navigate(`/employees/${employee.id}`)}
            onEdit={() => navigate(`/employees/${employee.id}/edit`)}
            onDelete={() => handleDelete(employee.id)}
          />
        ))}
      </div>
    </div>
  );
}

function EmployeeCard({
  employee,
  onView,
  onEdit,
  onDelete
}: {
  employee: Employee;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={employeeImageURL(employee)}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600">{employee.title}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-indigo-600"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">{employee.email}</p>
        <p className="text-sm text-gray-600">{employee.departmentId}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {employee.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
        {employee.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs">
            +{employee.skills.length - 3} more
          </span>
        )}
      </div>

      <Button
        onClick={onView}
        className="mt-4"
      >
        View Details
      </Button>
    </div>
  );
}