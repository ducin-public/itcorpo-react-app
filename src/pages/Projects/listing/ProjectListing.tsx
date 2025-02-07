import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { deleteProject } from '../../../api/ProjectApi.axios';
import { projectsListQuery } from '../../../api/ProjectQueries';

import { useNotifications } from '../../../components/Notifications/NotificationContext';
import { ProjectCard } from '../listing/ProjectCard';
import { ProjectSearchBar } from '../search/ProjectSearchBar';
import { useProjectSearch } from '../search/ProjectSearchContext';
import { Button } from '../../../components/Generic/Button';
import { Pagination } from '../../../components/Generic/Pagination';
import { Spinner } from '../../../components/Generic/Spinner';
import { H1 } from '../../../components/Typography/Headings';
import { FlexText } from '../../../components/Typography/FlexText';
import { Text } from '../../../components/Typography/Text';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';

export function ProjectListing() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const { queryParams, params, setPage } = useProjectSearch();

  const { data: response, isFetching } = useQuery({
    ...projectsListQuery(queryParams),
    placeholderData: (prev) => prev
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
        <FlexText>
          <H1 className='mb-0'>Projects</H1>
          {response && <Text>(available: {response.totalCount}, showing: {response.items.length})</Text>}
        </FlexText>
        <Button
          icon={Plus}
          onClick={() => navigate('/projects/new')}
          className="flex items-center space-x-2"
        >
          New Project
        </Button>
      </div>

      <ProjectSearchBar />

      {response && (
        <div className="mt-4 mb-6">
          <Pagination
            currentPage={params.pagination.page}
            totalPages={response.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <div className="relative min-h-[200px]">
        <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
          <div className={`space-y-6 ${isFetching ? 'pointer-events-none' : ''}`}>
            {response?.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={() => navigate(`/projects/${project.id}/details`)}
                onEdit={() => navigate(`/projects/${project.id}/edit`)}
                onDelete={() => deleteMutation.mutate({ projectId: project.id })}
              />
            ))}
          </div>
        </SpinnerOverlay>
      </div>

      {response && (
        <div className="mt-6">
          <Pagination
            currentPage={params.pagination.page}
            totalPages={response.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
