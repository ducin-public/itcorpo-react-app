import { apiClient } from './client';
import type { Department } from '../contract-types/data-contracts';
import { Departments } from '../contract-types/DepartmentsRoute';

/**
 * GET /departments
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Departments/operation/getDepartments
 * @see {@link Department}
 * @returns {Promise<Departments.GetDepartments.ResponseBody>}
 */
export const getDepartments = () => {
  return apiClient.get<Departments.GetDepartments.ResponseBody>('/departments')
    .then(res => res.data);
};

/**
 * GET /departments/{departmentId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Departments/operation/getDepartmentById
 * @see {@link Department}
 * @returns {Promise<Departments.GetDepartmentById.ResponseBody>}
 */
export const getDepartment = ({ departmentId }: Departments.GetDepartmentById.RequestParams) => {
  return apiClient.get<Departments.GetDepartmentById.ResponseBody>(`/departments/${departmentId}`)
    .then(res => res.data);
};
