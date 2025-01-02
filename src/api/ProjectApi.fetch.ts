import { API_URL } from './client';
import type { Project, ProjectInput } from './data-contracts';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`);
  return handleResponse<Project[]>(response);
};

export const getProject = async (id: Project['id']): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects/${id}`);
  return handleResponse<Project>(response);
};

export const getProjectsCount = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/projects/count`);
  return handleResponse<number>(response);
};

export const createProject = async (project: ProjectInput): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return handleResponse<Project>(response);
};

export const updateProject = async (id: Project['id'], project: ProjectInput): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return handleResponse<Project>(response);
};

export const deleteProject = async (id: Project['id']): Promise<void> => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
