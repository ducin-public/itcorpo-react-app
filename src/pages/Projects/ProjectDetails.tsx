import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { Spinner } from '../../components/Generic/Spinner';
import { EditableProjectName } from './EditableProjectName';
import { ProjectTeamMembers } from './ProjectTeamMembers';
import { ProjectStatusChange } from './ProjectStatusChange';
import { getProject } from '../../api/ProjectApi.axios';
import { getEmployee } from '../../api/EmployeeApi.axios';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { Button } from '../../components/Generic/Button';

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id!),
  });

  const { data: employees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['project', id, 'employees'],
    queryFn: async () => {
      if (!project?.team) return [];
      const employeePromises = project.team.map(({id}) => getEmployee(id));
      return Promise.all(employeePromises);
    },
    enabled: !!project?.team,
  });

  if (isLoadingProject || isLoadingEmployees) return <Spinner />;
  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <EditableProjectName id={project.id} name={project.name} />
            <Button fill="OUTLINED" onClick={() => navigate('/projects')}>
              Back to list
            </Button>
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
                <div className="pt-2">
                  <ProjectStatusChange project={project} />
                </div>
              </div>
            </div>
          </div>

          {employees && (
            <ProjectTeamMembers
              projectId={project.id}
              employees={employees}
              // onUpdateEmployees={setEmployees}
            />
          )}
        </div>
      </div>
    </div>
  );
}