import type { Employee, EmployeeInput } from './data-contracts';
import { apiClient } from './client';

export const getEmployees = () => {
  return apiClient.get<Employee[]>('/employees')
    .then(res => res.data);
};

export const getEmployeesCount = () => {
  return apiClient.get<number>('/employees/count')
    .then(res => res.data);
};

export const getEmployee = (id: Employee['id']) => {
  return apiClient.get<Employee>(`/employees/${id}`)
    .then(res => res.data);
};

export const createEmployee = (employee: EmployeeInput) => {
  return apiClient.post<Employee>('/employees', employee)
    .then(res => res.data);
};

export const updateEmployee = (id: Employee['id'], employee: Partial<EmployeeInput>) => {
  return apiClient.put<Employee>(`/employees/${id}`, employee)
    .then(res => res.data);
};

export const deleteEmployee = (id: Employee['id']) => {
  return apiClient.delete<void>(`/employees/${id}`)
    .then(() => undefined);
};
