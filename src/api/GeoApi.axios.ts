import { apiClient } from './client';
import type { Geo } from '../contract-types/data-contracts';

/**
 * GET /geo
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Geo/operation/getGeo
 * @see {@link Geo}
 * @returns {Promise<Geo>}
 */
export const getGeo = () => {
  return apiClient.get<Geo>('/geo')
    .then(res => res.data);
};
