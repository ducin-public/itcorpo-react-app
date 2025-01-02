import axios from 'axios';
import { API_URL } from './config';
import { Employee } from './data-contracts';

export const getEmployees = (): Promise<Employee[]> => {
  return fetch(`${API_URL}/employees`)
    .then(res => res.json())
}

export const getEmployeesCount = (): Promise<number> => {
  return fetch(`${API_URL}/employees/count`)
    .then(res => res.json())
}

export const getEmployees__ = () => {
  return axios.get<Employee[]>(`${API_URL}/employees`)
    .then(res => res.data)
}
