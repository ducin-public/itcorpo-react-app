import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Pagination } from '../../components/Generic/Pagination';

import { ProjectCard } from './listing/ProjectCard';
import { ProjectSearchBar } from './search/ProjectSearchBar';
import { Button } from '../../components/Generic/Button';
import { H1 } from '../../components/Typography/Headings';
import { FlexText } from '../../components/Typography/FlexText';
import { Text } from '../../components/Typography/Text';
import { useProjectSearch } from './search/ProjectSearchContext';
import { SpinnerOverlay } from '../../components/Generic/SpinnerOverlay';
import { useEffect, useState } from 'react';
import { getProjects } from '../../api/ProjectApi.axios';
import { Project } from '../../contract-types/data-contracts';

export function ProjectList() {
  const navigate = useNavigate();
  const { queryParams, params, setPage } = useProjectSearch();

  const [response, setResponse] = useState<{ items: Project[]; totalCount: number; totalPages: number; }>({ items: [], totalCount: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    getProjects().then((response) => {
      setResponse(response);
      setIsFetching(false);
    });
  }, [])

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
                onDelete={() => console.log({ projectId: project.id })}
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
