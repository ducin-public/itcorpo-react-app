import { queryOptions } from "@tanstack/react-query";

import { getProjects, getProjectTeam } from "./ProjectApi.axios";
import { Project } from "../contract-types/data-contracts";

type QueryParams = NonNullable<Parameters<typeof getProjects>[0]>;

export const projectsListQuery = (queryParams: QueryParams) => queryOptions({
  queryKey: ['projects', queryParams],
  queryFn: () => getProjects(queryParams),
  placeholderData: (prev) => prev
})

export const projectTeamQuery = (projectId: Project['id']) => queryOptions({
  queryKey: ['project', projectId, 'team'],
  queryFn: () => getProjectTeam({ projectId }),
  placeholderData: (prev) => prev
})
