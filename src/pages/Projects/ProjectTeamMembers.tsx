import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';

import { useNotifications } from '../../contexts/NotificationContext';
import { Button } from '../../components/Generic/Button';
import { updateProject } from '../../api/ProjectApi.axios';
import { getEmployees } from '../../api/EmployeeApi.axios';
import { Employee } from '../../api/data-contracts';
import { employeeImageURL } from '../Employees/employeeImageURL';
import { EmployeeSkills } from '../Employees/EmployeeSkills';

interface ProjectTeamMembersProps {
  projectId: string;
  employees: Employee[];
  onUpdateEmployees: (employees: Employee[]) => void;
}

export function ProjectTeamMembers({ projectId, employees, onUpdateEmployees }: ProjectTeamMembersProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const allEmployees = await getEmployees();
      const filtered = allEmployees.filter(
        emp => 
          !employees.find(e => e.id === emp.id) &&
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      addNotification('error', 'Failed to search employees');
    }
  };

  const handleAddEmployee = async (employee: Employee) => {
    try {
      const updatedEmployees = [...employees, employee];
      await updateProject(projectId, { employees: updatedEmployees });
      onUpdateEmployees(updatedEmployees);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      addNotification('notice', `${employee.firstName} ${employee.lastName} added to the project`);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      addNotification('error', 'Failed to add employee to project');
    }
  };

  const handleRemoveEmployee = async (employeeId: Employee['id']) => {
    try {
      const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
      await updateProject(projectId, { employees: updatedEmployees });
      onUpdateEmployees(updatedEmployees);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      addNotification('notice', 'Employee removed from project');
    } catch (error) {
      addNotification('error', 'Failed to remove employee from project');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
        <Button onClick={() => setIsSearching(!isSearching)} >
          {isSearching ? 'Done' : 'Add Member'}
        </Button>
      </div>

      {isSearching && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-lg shadow-sm border border-gray-200">
              {searchResults.map((employee) => (
                <div
                  key={employee.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                  onClick={() => handleAddEmployee(employee)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={employeeImageURL(employee)}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{employee.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg group"
          >
            <img
              src={employeeImageURL(employee)}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-sm text-gray-600">{employee.title}</p>
              <div className="mt-1">
                <EmployeeSkills skills={employee.skills} expanded={false} collapseAbove={3} />
              </div>
            </div>
            <button
              onClick={() => handleRemoveEmployee(employee.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}