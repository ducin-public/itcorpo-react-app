import { API_URL } from './client';
import type { Employee, EmployeeInput } from '../contract-types/data-contracts';
import { Employees } from '../contract-types/EmployeesRoute';

// if all criterias are handled 1:1, we can use the `buildURLSearchParams` function
const buildEmployeeSearchParams__LEGACY = (criteria: Employees.GetEmployees.RequestQuery = {}): URLSearchParams => {
  const params = new URLSearchParams();

  if (criteria.departmentId) {
    params.append('departmentId', criteria.departmentId);
  }
  if (criteria.employeeName) {
    params.append('employeeName', criteria.employeeName);
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

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * GET /employees
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployees
 * @see {@link Employees.GetEmployees.RequestQuery}
 * @see {@link Employee}
 * @returns {Promise<Employees.GetEmployees.ResponseBody>}
 */
export const getEmployees = async (criteria: Employees.GetEmployees.RequestQuery = {}): Promise<Employees.GetEmployees.ResponseBody> => {
  const params = buildEmployeeSearchParams__LEGACY(criteria);
  const response = await fetch(`${API_URL}/employees?${params.toString()}`);
  return handleResponse<Employees.GetEmployees.ResponseBody>(response);
};

/**
 * GET /employees/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeesCount
 * @see {@link Employees.GetEmployeesCount.RequestQuery}
 * @returns {Promise<Employees.GetEmployeesCount.ResponseBody>}
 */
export const getEmployeesCount = async (criteria: Employees.GetEmployeesCount.RequestQuery = {}): Promise<Employees.GetEmployeesCount.ResponseBody> => {
  const params = buildEmployeeSearchParams__LEGACY(criteria);
  const response = await fetch(`${API_URL}/employees/count?${params.toString()}`);
  return handleResponse<Employees.GetEmployeesCount.ResponseBody>(response);
};

/**
 * GET /employees/{employeeId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/getEmployeeById
 * @see {@link Employee}
 * @returns {Promise<Employees.GetEmployeeById.ResponseBody>}
 */
export const getEmployeeById = async ({ employeeId }: Employees.GetEmployeeById.RequestParams): Promise<Employees.GetEmployeeById.ResponseBody> => {
  const response = await fetch(`${API_URL}/employees/${employeeId}`);
  return handleResponse<Employees.GetEmployeeById.ResponseBody>(response);
};

/**
 * POST /employees
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/createEmployee
 * @see {@link EmployeeInput}
 * @see {@link Employee}
 * @returns {Promise<Employees.CreateEmployee.ResponseBody>}
 */
export const createEmployee = async (employee: Employees.CreateEmployee.RequestBody): Promise<Employees.CreateEmployee.ResponseBody> => {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  return handleResponse<Employees.CreateEmployee.ResponseBody>(response);
};

/**
 * PUT /employees/{employeeId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/updateEmployee
 * @see {@link EmployeeInput}
 * @see {@link Employee}
 * @returns {Promise<Employees.UpdateEmployee.ResponseBody>}
 */
export const updateEmployee = async (
  { employeeId }: Employees.UpdateEmployee.RequestParams,
  employee: Employees.UpdateEmployee.RequestBody
): Promise<Employees.UpdateEmployee.ResponseBody> => {
  const response = await fetch(`${API_URL}/employees/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  return handleResponse<Employees.UpdateEmployee.ResponseBody>(response);
};

/**
 * DELETE /employees/{employeeId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Employees/operation/deleteEmployee
 * @returns {Promise<void>}
 */
export const deleteEmployee = async ({ employeeId }: Employees.DeleteEmployee.RequestParams): Promise<Employees.DeleteEmployee.ResponseBody> => {
  const response = await fetch(`${API_URL}/employees/${employeeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
