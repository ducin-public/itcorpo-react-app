import { API_URL } from './config';
import { Geo } from './data-contracts';

export const getGeo = (): Promise<Geo> => {
  return fetch(`${API_URL}/geo`)
    .then(res => res.json())
}
