import { useState, useCallback } from 'react';
import { getProjects } from "../../../api/ProjectApi.axios";
import { ProjectStatus } from "../../../contract-types/data-contracts";
import type { PaginationState } from '../../../components/Generic/usePagination';

export type TeamMemberFiltering = "ANY" | "ALL";

export interface ProjectSortingState {
  sortBy?: "NAME" | "STATUS" | "START_DATE" | "END_DATE" | "TEAM_SIZE";
  sortOrder?: "ASC" | "DESC";
}

export interface ProjectFilterState {
  projectName?: string;
  statuses: ProjectStatus[];
  teamMemberName?: string;
  teamMemberFiltering: TeamMemberFiltering;
  budgetMin?: number;
  budgetMax?: number;
}

export interface ProjectSearchParams {
  filters: ProjectFilterState;
  sorting: ProjectSortingState;
  pagination: PaginationState;
}

export const initialProjectSearchFilters: ProjectSearchParams = {
  filters: {
    statuses: [],
    teamMemberFiltering: 'ANY',
  },
  sorting: {
    sortBy: 'NAME',
    sortOrder: 'ASC',
  },
  pagination: {
    page: 1,
    pageSize: 20,
  },
};

export type QueryParams = NonNullable<Parameters<typeof getProjects>[0]>;

function sortByMap(local: ProjectSortingState['sortBy']): QueryParams['sortBy'] {
  switch (local) {
    case 'NAME': return 'name';
    case 'STATUS': return 'status';
    case 'START_DATE': return 'startDate';
    case 'END_DATE': return 'endDate';
    case 'TEAM_SIZE': return 'teamSize';
    default: return undefined;
  }
};

function sortOrderMap(local: ProjectSortingState['sortOrder']): QueryParams['sortOrder'] {
  switch (local) {
    case 'ASC': return 'asc';
    case 'DESC': return 'desc';
    default: return undefined;
  }
}

export function searchCriteriaToQuery(criteria: ProjectSearchParams): QueryParams {
  return {
    projectName: criteria.filters.projectName,
    status: criteria.filters.statuses.length ? criteria.filters.statuses[0] : undefined,
    teamMembers: criteria.filters.teamMemberName,
    teamMembersFiltering: criteria.filters.teamMemberFiltering,
    budgetFrom: criteria.filters.budgetMin?.toString(),
    budgetTo: criteria.filters.budgetMax?.toString(),
    page: criteria.pagination.page,
    pageSize: criteria.pagination.pageSize,
    sortBy: sortByMap(criteria.sorting.sortBy),
    sortOrder: sortOrderMap(criteria.sorting.sortOrder),
  };
}

export function useProjectSearchState() {
  const [params, setParams] = useState<ProjectSearchParams>(initialProjectSearchFilters);

  const setFilters = useCallback((filters: Partial<ProjectFilterState>) => {
    setParams(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  }, []);

  const setSorting = useCallback((sorting: Partial<ProjectSortingState>) => {
    setParams(prev => ({
      ...prev,
      sorting: { ...prev.sorting, ...sorting }
    }));
  }, []);

  const setPagination = useCallback((pagination: Partial<PaginationState>) => {
    setParams(prev => ({
      ...prev,
      pagination: { ...prev.pagination, ...pagination }
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setPagination({ page });
  }, [setPagination]);

  const queryParams = searchCriteriaToQuery(params);

  return {
    params,
    setParams,
    setFilters,
    setSorting,
    setPagination,
    setPage,
    queryParams,
  };
}
