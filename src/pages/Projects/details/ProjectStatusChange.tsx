import { useQueryClient } from '@tanstack/react-query';

import { useNotifications } from '../../../contexts/NotificationContext';
import { Project, ProjectStatus } from '../../../contract-types/data-contracts';
import { updateProjectStatus } from '../../../api/ProjectApi.axios';
import { Dropdown } from '../../../components/Forms/Dropdown';
import { projectStatusDict } from '../ProjectStatus';

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

    // FIXME: this should be a mutation
    try {
      await updateProjectStatus({ projectId: project.id }, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ['project', project.id] });
      addNotification('notice', `Project status updated to ${newStatus}`);
    } catch (error) {
      addNotification('error', 'Failed to update project status');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Dropdown
        label="Project Status"
        value={project.status}
        onChange={(newStatus) => handleStatusChange(newStatus as Project['status'])}
        options={projectStatusDict}
      />
    </div>
  );
}