import { API_URL } from './config';
import { Benefit } from './dto';

export const getBenefits = (): Promise<Benefit[]> => {
  return fetch(`${API_URL}/benefits`)
    .then(res => res.json())
}
