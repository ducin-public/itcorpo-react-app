import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
  
import { Spinner } from '../../components/Generic/Spinner';
import { ProjectCard } from './ProjectCard';
import { useNotifications } from '../../contexts/NotificationContext';
import { deleteProject, getProjects } from '../../api/ProjectApi.axios';
import { ProjectSearchBar } from './ProjectSearchBar';
import { ProjectSearchFilters } from './ProjectSearchFilters';
import { Button } from '../../components/Generic/Button';

export function ProjectList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const [searchCriteria, setSearchCriteria] = useState<ProjectSearchFilters>({ statuses: [] });
  
  const { data: projects, isFetching } = useQuery({
    queryKey: ['projects', searchCriteria],
    queryFn: () => getProjects()
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      addNotification('notice', 'Project successfully deleted');
    },
    onError: (error) => {
      addNotification('error', `Failed to delete project: ${error}`);
    },
  });

  return (
    <div className="px-2 py-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button
          onClick={() => navigate('/projects/new')}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" /><span>New Project</span>
        </Button>
      </div>

      <ProjectSearchBar onCriteriaUpdate={setSearchCriteria} />

      <div className="relative min-h-[200px]">
        {(isFetching) && (
          <Spinner size='LARGE' layout='OVERLAY' />
        )}

        <div className={`space-y-6 ${isFetching ? 'pointer-events-none' : ''}`}>
          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => navigate(`/projects/${project.id}`)}
              onEdit={() => navigate(`/projects/${project.id}/edit`)}
              onDelete={() => deleteMutation.mutate({ projectId: project.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}