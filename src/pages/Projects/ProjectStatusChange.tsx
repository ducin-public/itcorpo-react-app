import { useQueryClient } from '@tanstack/react-query';

import { useNotifications } from '../../contexts/NotificationContext';
import { Project, ProjectStatus } from '../../contract-types/data-contracts';
import { updateProject } from '../../api/ProjectApi.axios';

const statusColors: { [key in ProjectStatus]: string } = {
  'PLANNING': 'bg-yellow-100 text-yellow-800',
  'ACTIVE': 'bg-green-100 text-green-800',
  'COMPLETED': 'bg-blue-100 text-blue-800',
  'ON_HOLD': 'bg-red-100 text-red-800'
};

interface ProjectStatusChangeProps {
  project: Project;
}

export function ProjectStatusChange({ project }: ProjectStatusChangeProps) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const handleStatusChange = async (newStatus: Project['status']) => {
    if (newStatus === project.status) return;

    const confirmed = window.confirm(
      `Are you sure you want to change the project status to ${newStatus}?`
    );

    if (!confirmed) return;

    try {
      await updateProject({ projectId: project.id }, { status: newStatus }); // FIXME: PATCH vs PUT
      queryClient.invalidateQueries({ queryKey: ['project', project.id] });
      addNotification('notice', `Project status updated to ${newStatus}`);
    } catch (error) {
      addNotification('error', 'Failed to update project status');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-500">Status:</span>
      <select
        value={project.status}
        onChange={(e) => handleStatusChange(e.target.value as Project['status'])}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          statusColors[project.status]
        } border-0 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        <option value="planning">Planning</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="on-hold">On Hold</option>
      </select>
    </div>
  );
}