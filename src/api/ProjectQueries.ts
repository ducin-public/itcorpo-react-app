import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { getProjects, getProjectTeam, deleteProject } from "./ProjectApi.axios";
import { Project } from "../contract-types/data-contracts";
import { useNotifications } from '../components/Notifications/NotificationContext';

type QueryParams = NonNullable<Parameters<typeof getProjects>[0]>;

const projectQueryKeys = {
  all: ['projects'] as const,
  allLists: ['projects', 'list'] as const,
  list(params: QueryParams) {
    return [...projectQueryKeys.allLists, params] as const;
  },
  allDetails: ['project', 'details'] as const,
  details: (projectId: Project['id']) => {
    return [...projectQueryKeys.allDetails, projectId] as const;
  },
  team(projectId: Project['id']) {
    return [...projectQueryKeys.details(projectId), 'team'] as const;
  },
}

export const projectsListQuery = (queryParams: QueryParams) => queryOptions({
  queryKey: projectQueryKeys.list(queryParams),
  queryFn: () => getProjects(queryParams),
})

export const projectTeamQuery = (projectId: Project['id']) => queryOptions({
  queryKey: projectQueryKeys.team(projectId),
  queryFn: () => getProjectTeam({ projectId }),
})

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.allLists });
      addNotification('notice', 'Project successfully deleted');
    },
    onError: (error) => {
      addNotification('error', `Failed to delete project: ${error}`);
    },
  });
  return deleteMutation;
}
