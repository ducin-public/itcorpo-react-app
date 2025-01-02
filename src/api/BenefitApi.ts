import { API_URL } from './config';
import { Benefit } from './data-contracts';

export const getBenefits = (): Promise<Benefit[]> => {
  return fetch(`${API_URL}/benefits`)
    .then(res => res.json())
}
