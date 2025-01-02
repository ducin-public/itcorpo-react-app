import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../mock-utils/api';
import { Spinner } from '../../components/Generic/Spinner';
import { formatCurrency } from '../../mock-utils/format';
import { format } from 'date-fns';
import { EditableProjectName } from './EditableProjectName';
import { ProjectTeamMembers } from './ProjectTeamMembers';
import { ProjectStatusChange } from './ProjectStatusChange';
import { Employee } from '../../mock-utils';

export function ProjectDetails() {
  const { id } = useParams();
  const [employees, setEmployees] = useState<Employee[]>([]);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.projects.get(id!),
    onSuccess: (data) => setEmployees(data.employees),
  });

  if (isLoading) return <Spinner />;
  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <EditableProjectName id={project.id} name={project.name} />
            <ProjectStatusChange project={project} />
          </div>

          <p className="text-gray-600 mb-6">{project.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Budget:</span>{' '}
                  <span className="text-gray-900">{formatCurrency(project.budget)}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Start Date:</span>{' '}
                  <span className="text-gray-900">
                    {format(new Date(project.startDate), 'MMM d, yyyy')}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">End Date:</span>{' '}
                  <span className="text-gray-900">
                    {format(new Date(project.endDate), 'MMM d, yyyy')}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <ProjectTeamMembers
            projectId={project.id}
            employees={employees}
            onUpdateEmployees={setEmployees}
          />
        </div>
      </div>
    </div>
  );
}