import { apiClient } from './client';
import type { Department } from './data-contracts';

export const getDepartments = () => {
  return apiClient.get<Department[]>('/departments')
    .then(res => res.data);
};

export const getDepartment = (id: Department['id']) => {
  return apiClient.get<Department>(`/departments/${id}`)
    .then(res => res.data);
};
