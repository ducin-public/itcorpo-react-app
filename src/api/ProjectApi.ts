import { API_URL } from './config';
import { Project } from './dto';

export const getProjects = (): Promise<Project[]> => {
  return fetch(`${API_URL}/projects`)
    .then(res => res.json())
}

export const getProjectsCount = (): Promise<number> => {
  return fetch(`${API_URL}/projects/count`)
    .then(res => res.json())
}
