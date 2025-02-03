import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DatabaseBackup, Plus, Search, X } from 'lucide-react';

import { useNotifications } from '../../../contexts/NotificationContext';
import { Button } from '../../../components/Generic/Button';
import { addProjectTeamMember, removeProjectTeamMember } from '../../../api/ProjectApi.axios';
import { getEmployees } from '../../../api/EmployeeApi.axios';
import { Employee, Project, ProjectEmployeeInvolvement } from '../../../contract-types/data-contracts';
import { employeeImageURL } from '../../Employees/employeeImageURL';

interface ProjectTeamMembersProps {
  project: Project;
  team: ProjectEmployeeInvolvement[];
}

export function ProjectTeamMembers({ project, team }: ProjectTeamMembersProps) {
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
          !team.find(e => e.employeeId === emp.id) &&
          `${emp.name}`.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (error) {
      addNotification('error', 'Failed to search employees');
    }
  };

  const handleAddProjectMember = async (employee: Employee) => {
    try {
      await addProjectTeamMember({
        projectId: project.id
      }, {
        employeeId: employee.id,
        projectId: project.id,
        // FIXME: remove hardcoded values
        engagementLevel: 'FULL_TIME',
        startDate: new Date() + '',
        // endDate: null,
      }); // FIXME; add mutation (invalidate query, but also modify project/id state)
      queryClient.invalidateQueries({ queryKey: ['project', project.id] });
      addNotification('notice', `${employee.name} added to the project`);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      addNotification('error', 'Failed to add employee to project');
    }
  };

  const handleRemoveProjectMember = async (employeeId: Employee['id']) => {
    try {
      await removeProjectTeamMember({
        projectId: project.id,
        memberId: employeeId,
      }) // FIXME; add mutation (invalidate query, but also modify project/id state)
      queryClient.invalidateQueries({ queryKey: ['project', project.id] });
      addNotification('notice', 'Employee removed from project');
    } catch (error) {
      addNotification('error', 'Failed to remove employee from project');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button
          icon={isSearching ? DatabaseBackup : Plus}
          onClick={() => setIsSearching(!isSearching)}
        >
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
                  onClick={() => handleAddProjectMember(employee)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={employeeImageURL(employee)}
                      alt={`${employee.name}`}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {employee.name}
                      </p>
                      <p className="text-sm text-gray-500">{employee.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((employee) => (
          <div
            key={employee.employeeId}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg group"
          >
            <img
              src={employeeImageURL({ imgURL: employee.employeeURL })}
              alt={`${employee.employeeName}`}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {employee.employeeName}
              </p>
              <p className="text-sm text-gray-600">{employee.employeePosition}</p>
            </div>
            <button
              onClick={() => handleRemoveProjectMember(employee.employeeId)}
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