import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus, Search, Trash2, Edit, BookHeart } from 'lucide-react';
import { api } from '../../mock-utils/api';
import { Spinner } from '../../components/Spinner';
import { useNotifications } from '../../contexts/NotificationContext';
import { Employee } from '../../types';
import { RecentlyViewedEmployees } from '../RecentlyViewedEmployees';
import { Sidebar } from '../../components/sidebar/sidebar';

export function Employees() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: api.employees.list
  });

  const filteredEmployees = employees?.filter(employee => 
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      await api.employees.delete(id);
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
        <button
          onClick={() => navigate('/employees/new')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>
      <h3 className="mb-3 text-blue-600 cursor-auto">
        <BookHeart className='text-3xl cursor-auto' onClick={toggleSidebarCollapsed} /> Recently Viewed
      </h3>
      <Sidebar collapsed={sidebarCollapsed} onCloseClick={toggleSidebarCollapsed}>
        <RecentlyViewedEmployees />
      </Sidebar>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
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
            src={employee.profileImage}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600">{employee.position}</p>
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
        <p className="text-sm text-gray-600">{employee.department}</p>
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

      <button
        onClick={onView}
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
      >
        View Details
      </button>
    </div>
  );
}