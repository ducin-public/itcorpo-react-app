import { API_URL } from './config';
import { Office } from './data-contracts';

export const getOffices = (): Promise<Office[]> => {
  return fetch(`${API_URL}/offices`)
    .then(res => res.json())
}

export const getOfficesCount = (): Promise<number> => {
  return fetch(`${API_URL}/offices/count`)
    .then(res => res.json())
}
