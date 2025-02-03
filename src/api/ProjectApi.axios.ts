import { apiClient, buildURLSearchParams } from './client';
import { Projects } from '../contract-types/ProjectsRoute';
import type { ProjectInput, ProjectEmployeeInvolvement } from '../contract-types/data-contracts';

/**
 * GET /projects
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjects
 * @see {@link Project}
 * @returns {Promise<Projects.GetProjects.ResponseBody>}
 */
export const getProjects = (criteria: Projects.GetProjects.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Projects.GetProjects.ResponseBody>('/projects', { params })
    .then(res => {
      return {
        items: res.data,
        totalCount: parseInt(res.headers['x-total-count'] || '0', 10),
        totalPages: parseInt(res.headers['x-total-pages'] || '0', 10),
      }
    });
};

/**
 * GET /projects/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjectsCount
 * @see {@link ProjectsSearchCriteria}
 * @see {@link Project}
 * @returns {Promise<Projects.GetProjectsCount.ResponseBody>}
 */
export const getProjectsCount = (criteria: Projects.GetProjectsCount.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Projects.GetProjectsCount.ResponseBody>('/projects/count', { params })
    .then(res => res.data);
};

/**
 * GET /projects/{projectId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjectById
 * @see {@link Project}
 * @returns {Promise<Projects.GetProjectById.ResponseBody>}
 */
export const getProjectById = ({ projectId }: Projects.GetProjectById.RequestParams) => {
  return apiClient.get<Projects.GetProjectById.ResponseBody>(`/projects/${projectId}`)
    .then(res => res.data);
};

/**
 * POST /projects
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/createProject
 * @see {@link ProjectInput}
 * @see {@link Project}
 * @returns {Promise<Projects.CreateProject.ResponseBody>}
 */
export const createProject = (projectData: Projects.CreateProject.RequestBody) => {
  return apiClient.post<Projects.CreateProject.ResponseBody>('/projects', projectData)
    .then(res => res.data);
};

/**
 * PUT /projects/{projectId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/updateProject
 * @see {@link ProjectInput}
 * @see {@link Project}
 * @returns {Promise<Projects.UpdateProject.ResponseBody>}
 */
export const updateProject = (
  { projectId }: Projects.UpdateProject.RequestParams,
  projectData: Projects.UpdateProject.RequestBody
) => {
  return apiClient.put<Projects.UpdateProject.ResponseBody>(`/projects/${projectId}`, projectData)
    .then(res => res.data);
};

/**
 * DELETE /projects/{projectId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/deleteProject
 * @returns {Promise<Projects.DeleteProject.ResponseBody>}
 */
export const deleteProject = ({ projectId }: Projects.DeleteProject.RequestParams) => {
  return apiClient.delete<Projects.DeleteProject.ResponseBody>(`/projects/${projectId}`)
    .then(() => undefined);
};

/**
 * PUT /projects/{projectId}/status
 */
export const updateProjectStatus = (
  { projectId }: Projects.UpdateProjectStatus.RequestParams,
  status: Projects.UpdateProjectStatus.RequestBody
) => {
  return apiClient.put<Projects.UpdateProjectStatus.ResponseBody>(`/projects/${projectId}/status`, status)
    .then(res => res.data);
}

/**
 * GET /projects/{projectId}/team
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjectTeam
 * @see {@link ProjectEmployeeInvolvement}
 * @returns {Promise<Projects.GetProjectTeam.ResponseBody>}
 */
export const getProjectTeam = ({ projectId }: Projects.GetProjectTeam.RequestParams) => {
  return apiClient.get<Projects.GetProjectTeam.ResponseBody>(`/projects/${projectId}/team`)
    .then(res => res.data);
}

/**
 * POST /projects/{projectId}/team
 */
export const addProjectTeamMember = (
  { projectId }: Projects.AssignMemberToProject.RequestParams,
  involvement: Projects.AssignMemberToProject.RequestBody,
) => {
  return apiClient.post<Projects.AssignMemberToProject.ResponseBody>(`/projects/${projectId}/team`, involvement)
}

/**
 * PUT /projects/{projectId}/team/{memberId}
 */
export const updateProjectTeamMember = (
  { projectId, memberId }: Projects.UpdateProjectMember.RequestParams,
  involvement: Projects.UpdateProjectMember.RequestBody,
) => {
  return apiClient.put<Projects.UpdateProjectMember.ResponseBody>(`/projects/${projectId}/team/${memberId}`, involvement)
}

/**
 * DELETE /projects/{projectId}/team/{memberId}
 */
export const removeProjectTeamMember = (
  { projectId, memberId }: Projects.RemoveProjectMember.RequestParams,
) => {
  return apiClient.delete<Projects.RemoveProjectMember.ResponseBody>(`/projects/${projectId}/team/${memberId}`)
}
