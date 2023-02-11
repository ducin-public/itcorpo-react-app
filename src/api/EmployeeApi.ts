import axios from 'axios';
import { API_URL } from './config';
import { Employee } from '../typedef';

export const getEmployees = (): Promise<Employee[]> => {
  return fetch(`${API_URL}/employees`)
    .then(res => res.json())
}

export const getEmployees__ = () => {
  return axios.get<Employee[]>(`${API_URL}/employees`)
    .then(res => res.data)
}
