import { API_URL } from './config';
import { Employee } from '../typedef';

export const getEmployees = (): Promise<Employee[]> => {
  return fetch(`${API_URL}/employees`)
    .then(res => res.json())
}
