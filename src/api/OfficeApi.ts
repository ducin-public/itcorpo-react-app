import { API_URL } from './config';
import { Office } from '../typedef';

export const getOffices = (): Promise<Office[]> => {
  return fetch(`${API_URL}/offices`)
    .then(res => res.json())
}
