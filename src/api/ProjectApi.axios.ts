import { apiClient } from './client';
import type { Project, ProjectInput } from './data-contracts';

export const getProjects = () => {
  return apiClient.get<Project[]>('/projects')
    .then(res => res.data);
};

export const getProject = (id: Project['id']) => {
  return apiClient.get<Project>(`/projects/${id}`)
    .then(res => res.data);
};

export const getProjectsCount = () => {
  return apiClient.get<number>('/projects/count')
    .then(res => res.data);
};

export const createProject = (project: ProjectInput) => {
  return apiClient.post<Project>('/projects', project)
    .then(res => res.data);
};

export const updateProject = (id: Project['id'], project: Partial<ProjectInput>) => {
  return apiClient.put<Project>(`/projects/${id}`, project)
    .then(res => res.data);
};

export const deleteProject = (id: Project['id']) => {
  return apiClient.delete<void>(`/projects/${id}`)
    .then(() => undefined);
};
