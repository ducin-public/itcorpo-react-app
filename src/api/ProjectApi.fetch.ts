import { API_URL } from './client';
import { Projects } from '../contract-types/ProjectsRoute';
import type { Project, ProjectInput } from '../contract-types/data-contracts';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * GET /projects
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjects
 * @see {@link Project}
 * @returns {Promise<Projects.GetProjects.ResponseBody>}
 */
export const getProjects = async (criteria: Projects.GetProjects.RequestQuery = {}) => {
  const params = new URLSearchParams(criteria as Record<string, string>);
  const response = await fetch(`${API_URL}/projects?${params.toString()}`);
  return handleResponse<Projects.GetProjects.ResponseBody>(response);
};

/**
 * GET /projects/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjectsCount
 * @see {@link ProjectsSearchCriteria}
 * @see {@link Project}
 * @returns {Promise<Projects.GetProjectsCount.ResponseBody>}
 */
export const getProjectsCount = async () => {
  const response = await fetch(`${API_URL}/projects/count`);
  return handleResponse<Projects.GetProjectsCount.ResponseBody>(response);
};

/**
 * GET /projects/{projectId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/getProjectById
 * @see {@link Project}
 * @returns {Promise<Projects.GetProjectById.ResponseBody>}
 */
export const getProjectById = async ({ projectId }: Projects.GetProjectById.RequestParams) => {
  const response = await fetch(`${API_URL}/projects/${projectId}`);
  return handleResponse<Projects.GetProjectById.ResponseBody>(response);
};

/**
 * POST /projects
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/createProject
 * @see {@link ProjectInput}
 * @see {@link Project}
 * @returns {Promise<Projects.CreateProject.ResponseBody>}
 */
export const createProject = async (projectData: Projects.CreateProject.RequestBody) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  return handleResponse<Projects.CreateProject.ResponseBody>(response);
};

/**
 * PUT /projects/{projectId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/updateProject
 * @see {@link ProjectInput}
 * @see {@link Project}
 * @returns {Promise<Projects.UpdateProject.ResponseBody>}
 */
export const updateProject = async (
  { projectId }: Projects.UpdateProject.RequestParams,
  projectData: Projects.UpdateProject.RequestBody
) => {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  return handleResponse<Projects.UpdateProject.ResponseBody>(response);
};

/**
 * DELETE /projects/{projectId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Projects/operation/deleteProject
 * @returns {Promise<void>}
 */
export const deleteProject = async ({ projectId }: Projects.DeleteProject.RequestParams) => {
  const response = await fetch(`${API_URL}/projects/${projectId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
