import { API_URL } from './client';
import type { Employee, EmployeeInput } from './data-contracts';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employees`);
  return handleResponse<Employee[]>(response);
};

export const getEmployeesCount = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/employees/count`);
  return handleResponse<number>(response);
};

export const getEmployee = async (id: Employee['id']): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees/${id}`);
  return handleResponse<Employee>(response);
};

export const createEmployee = async (employee: EmployeeInput): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  return handleResponse<Employee>(response);
};

export const updateEmployee = async (id: Employee['id'], employee: Partial<EmployeeInput>): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  return handleResponse<Employee>(response);
};

export const deleteEmployee = async (id: Employee['id']): Promise<void> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
