
import { Project, ProjectStatus } from '../../../contract-types/data-contracts';
import { updateProjectStatus } from '../../../api/ProjectApi.axios';
import { Dropdown } from '../../../components/Forms/Dropdown';
import { projectStatusDict } from '../ProjectStatus';
interface ProjectStatusChangeProps {
  project: Project;
}

export function ProjectStatusChange({ project }: ProjectStatusChangeProps) {

  const handleStatusChange = async (newStatus: Project['status']) => {
    if (newStatus === project.status) return;

    const confirmed = window.confirm(
      `Are you sure you want to change the project status to ${newStatus}?`
    );

    if (!confirmed) return;

    await updateProjectStatus({ projectId: project.id }, { status: newStatus });
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