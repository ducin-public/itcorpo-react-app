import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../../mock-utils/api';
import { Spinner } from '../../components/Spinner';
import { ProjectCard } from './ProjectCard';
import { useNotifications } from '../../contexts/NotificationContext';

export function ProjectList() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: api.projects.list
  });

  const handleDelete = async (id: string) => {
    try {
      await api.projects.delete(id);
      addNotification('notice', 'Project successfully deleted');
    } catch (error) {
      addNotification('error', 'Failed to delete project');
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => navigate('/projects/new')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={() => navigate(`/projects/${project.id}`)}
            onEdit={() => navigate(`/projects/${project.id}/edit`)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
    </div>
  );
}