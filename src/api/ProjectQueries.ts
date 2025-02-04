import { queryOptions } from "@tanstack/react-query";

import { getProjects, getProjectTeam } from "./ProjectApi.axios";
import { Project } from "../contract-types/data-contracts";

type QueryParams = NonNullable<Parameters<typeof getProjects>[0]>;

export const projectsListQuery = (queryParams: QueryParams) => queryOptions({
  queryKey: ['projects', 'list', queryParams],
  queryFn: () => getProjects(queryParams),
})

export const projectTeamQuery = (projectId: Project['id']) => queryOptions({
  queryKey: ['project', 'details', projectId, 'team'],
  queryFn: () => getProjectTeam({ projectId }),
})
