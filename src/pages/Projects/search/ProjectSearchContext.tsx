import { createContext, useContext, PropsWithChildren } from 'react';
import { useProjectSearchState } from './ProjectSearchParams';
import type { ProjectFilterState, ProjectSortingState, ProjectSearchParams, QueryParams } from './ProjectSearchParams';

type ProjectSearchContextValue = {
  params: ProjectSearchParams;
  setParams: (params: ProjectSearchParams) => void;
  setFilters: (filters: Partial<ProjectFilterState>) => void;
  setSorting: (sorting: Partial<ProjectSortingState>) => void;
  setPagination: (pagination: Partial<{ page: number; pageSize: number }>) => void;
  setPage: (page: number) => void;
  queryParams: QueryParams;
};

const ProjectSearchContext = createContext<ProjectSearchContextValue | null>(null);

export function ProjectSearchProvider({ children }: PropsWithChildren) {
  const searchState = useProjectSearchState();
  
  return (
    <ProjectSearchContext.Provider value={searchState}>
      {children}
    </ProjectSearchContext.Provider>
  );
}

export function useProjectSearch() {
  const context = useContext(ProjectSearchContext);
  if (!context) {
    throw new Error('useProjectSearch must be used within ProjectSearchProvider');
  }
  return context;
}
