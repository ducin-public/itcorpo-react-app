import { Employees } from '../contract-types/EmployeesRoute';
import { apiClient } from './client';

// if all criterias are handled 1:1, we can use the `buildURLSearchParams` function
const buildEmployeeSearchParams__LEGACY = (criteria: Employees.GetEmployees.RequestQuery = {}): URLSearchParams => {
  const params = new URLSearchParams();

  if (criteria.group) {
    params.append('group', criteria.group);
  }
  if (criteria.departmentId) {
    params.append('departmentId', criteria.departmentId);
  }
  if (criteria.employeeName) {
    params.append('employeeName', encodeURIComponent(criteria.employeeName));
  }
  if (criteria.salaryFrom) {
    params.append('salaryFrom', criteria.salaryFrom);
  }
  if (criteria.salaryTo) {
    params.append('salaryTo', criteria.salaryTo);
  }
  if (criteria.skills) {
    params.append('skills', criteria.skills);
  }
  if (criteria.skillsFiltering) {
    params.append('skillsFiltering', criteria.skillsFiltering);
  }

  return params;
}

/**
 * GET /employees
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployees
 * @see {@link Employees.GetEmployees.RequestQuery}
 * @see {@link Employee}
 * @returns {Promise<Employees.GetEmployees.ResponseBody>}
 */
export const getEmployees = (criteria: Employees.GetEmployees.RequestQuery = {}) => {
  const params = buildEmployeeSearchParams__LEGACY(criteria);
  return apiClient.get<Employees.GetEmployees.ResponseBody>('/employees', { params })
    .then(res => res.data);
};

/**
 * GET /employees/search-feed
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeesSearchFeed
 * @see {@link Employees.GetEmployeesSearchFeed.RequestQuery}
 * @see {@link Employee}
 * @returns {Promise<Employees.GetEmployeesSearchFeed.ResponseBody>}
 */
export const getEmployeesSearchFeed = (criteria: Employees.GetEmployeesSearchFeed.RequestQuery = {}) => {
  const params = buildEmployeeSearchParams__LEGACY(criteria);
  return apiClient.get<Employees.GetEmployeesSearchFeed.ResponseBody>('/employees/search-feed', { params })
    .then(res => res.data);
};

/**
 * GET /employees/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeesCount
 * @see {@link Employees.GetEmployeesCount.RequestQuery}
 * @see {@link Employee}
 * @returns {Promise<Employees.GetEmployeesCount.ResponseBody>}
 */
export const getEmployeesCount = (criteria: Employees.GetEmployees.RequestQuery = {}) => {
  const params = buildEmployeeSearchParams__LEGACY(criteria);
  return apiClient.get<Employees.GetEmployeesCount.ResponseBody>('/employees/count', { params })
    .then(res => res.data);
};

/**
 * GET /employees/{employeeId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeeById
 * @see {@link Employee}
 * @returns {Promise<Employees.GetEmployeeById.ResponseBody>}
 */
export const getEmployeeById = ({ employeeId }: Employees.GetEmployeeById.RequestParams) => {
  return apiClient.get<Employees.GetEmployeeById.ResponseBody>(`/employees/${employeeId}`)
    .then(res => res.data);
};

/**
 * GET /employees/{employeeId}/edit
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeeEditData
 * @see {@link Employees.GetEmployeeEditData.RequestParams}
 * @returns {Promise<Employees.GetEmployeeEditData.ResponseBody>}
 */
export const getEmployeeEditData = ({ employeeId }: Employees.GetEmployeeEditData.RequestParams) => {
  return apiClient.get<Employees.GetEmployeeEditData.ResponseBody>(`/employees/${employeeId}/edit`)
    .then(res => res.data);
}

/**
 * POST /employees
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/createEmployee
 * @see {@link EmployeeInput}
 * @returns {Promise<Employees.CreateEmployee.ResponseBody>}
 */
export const createEmployee = (employeeData: Employees.CreateEmployee.RequestBody) => {
  return apiClient.post<Employees.CreateEmployee.ResponseBody>('/employees', employeeData)
    .then(res => res.data);
};

/**
 * PUT /employees/{employeeId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/updateEmployee
 * @see {@link EmployeeInput}
 * @returns {Promise<Employees.UpdateEmployee.ResponseBody>}
 */
export const updateEmployee = (
  { employeeId }: Employees.UpdateEmployee.RequestParams,
  employeeData: Employees.UpdateEmployee.RequestBody
) => {
  return apiClient.put<Employees.UpdateEmployee.ResponseBody>(`/employees/${employeeId}`, employeeData)
    .then(res => res.data);
};

/**
 * DELETE /employees/{employeeId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/deleteEmployee
 * @see {@link Employee}
 * @returns {Promise<Employees.DeleteEmployee.ResponseBody>}
 */
export const deleteEmployee = ({ employeeId }: Employees.DeleteEmployee.RequestParams) => {
  return apiClient.delete<Employees.DeleteEmployee.ResponseBody>(`/employees/${employeeId}`)
    .then(res => res.data);
};

/**
 * GET /employees/{employeeId}/projects
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeeProjects
 * @see {@link Employees.GetEmployeeProjects.RequestParams}
 * @see {@link Employees.GetEmployeeProjects.RequestQuery}
 * @returns {Promise<Employees.GetEmployeeProjects.ResponseBody>}
 */
export const getEmployeeProjects = (
  { employeeId }: Employees.GetEmployeeProjects.RequestParams
) => {
  return apiClient.get<Employees.GetEmployeeProjects.ResponseBody>(`/employees/${employeeId}/projects`)
    .then(res => res.data);
};
