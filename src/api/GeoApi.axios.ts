import { apiClient } from './client';
import type { Geo } from './data-contracts';

export const getGeo = () => {
  return apiClient.get<Geo>('/geo')
    .then(res => res.data);
};
