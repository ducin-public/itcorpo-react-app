import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { ProjectCard } from '../listing/ProjectCard';
import { ProjectSearchBar } from '../search/ProjectSearchBar';
import { useProjectSearch } from '../search/ProjectSearchContext';
import { Button } from '../../../components/Generic/Button';
import { Pagination } from '../../../components/Generic/Pagination';
import { H1 } from '../../../components/Typography/Headings';
import { FlexText } from '../../../components/Typography/FlexText';
import { Text } from '../../../components/Typography/Text';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';
import { useEffect, useState } from 'react';
import { getProjects } from '../../../api/ProjectApi.axios';
import { Project } from '../../../contract-types/data-contracts';

export function ProjectListing() {
  const navigate = useNavigate();
  const { queryParams, params, setPage } = useProjectSearch();

  const [projects, setProjects] = useState<{ items: Project[], totalCount: number, totalPages: number }>({ items: [], totalCount: 0, totalPages: 0 });
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    getProjects().then((projects) => {
      setProjects(projects);
      setIsFetching(false);
    });
  }, [])

  return (
    <div className="px-2 py-2">
      <div className="flex justify-between items-center mb-6">
        <FlexText>
          <H1 className='mb-0'>Projects</H1>
          {projects && <Text>(available: {projects.totalCount}, showing: {projects.items.length})</Text>}
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

      {projects && (
        <div className="mt-4 mb-6">
          <Pagination
            currentPage={params.pagination.page}
            totalPages={projects.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <div className="relative min-h-[200px]">
        <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
          <div className={`space-y-6 ${isFetching ? 'pointer-events-none' : ''}`}>
            {projects?.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={() => navigate(`/projects/${project.id}/details`)}
                onEdit={() => navigate(`/projects/${project.id}/edit`)}
                onDelete={() => console.log()}
              />
            ))}
          </div>
        </SpinnerOverlay>
      </div>

      {projects && (
        <div className="mt-6">
          <Pagination
            currentPage={params.pagination.page}
            totalPages={projects.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
