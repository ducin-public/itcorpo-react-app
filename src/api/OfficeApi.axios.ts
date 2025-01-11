import { apiClient, buildURLSearchParams } from './client';
import { Offices } from '../contract-types/OfficesRoute';
import type { Office, OfficeInput, OfficeAmenity } from '../contract-types/data-contracts';

/**
 * GET /offices/amenities
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/getOfficeAmenities
 * @see {@link OfficeAmenity}
 * @returns {Promise<Offices.GetOfficeAmenities.ResponseBody>}
 */
export const getOfficeAmenities = () => {
  return apiClient.get<Offices.GetOfficeAmenities.ResponseBody>('/offices/amenities')
    .then(res => res.data);
};

/**
 * GET /offices/amenities/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/getOfficeAmenitiesCount
 * @see {@link OfficeAmenity}
 * @returns {Promise<Offices.GetOfficeAmenitiesCount.ResponseBody>}
 */
export const getOfficeAmenitiesCount = () => {
  return apiClient.get<Offices.GetOfficeAmenitiesCount.ResponseBody>('/offices/amenities/count')
    .then(res => res.data);
}

/**
 * GET /offices
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/getOffices
 * @see {@link Office}
 * @returns {Promise<Offices.GetOffices.ResponseBody>}
 */
export const getOffices = (criteria: Offices.GetOffices.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Offices.GetOffices.ResponseBody>('/offices', { params })
    .then(res => res.data);
};

/**
 * GET /offices/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/getOfficesCount
 * @see {@link Office}
 * @returns {Promise<Offices.GetOfficesCount.ResponseBody>}
 */
export const getOfficesCount = (criteria: Offices.GetOfficesCount.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Offices.GetOfficesCount.ResponseBody>('/offices/count', { params })
    .then(res => res.data);
};

/**
 * POST /offices
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/createOffice
 * @see {@link OfficeInput}
 * @see {@link Office}
 * @returns {Promise<Offices.CreateOffice.ResponseBody>}
 */
export const createOffice = (officeData: Offices.CreateOffice.RequestBody) => {
  return apiClient.post<Offices.CreateOffice.ResponseBody>('/offices', officeData)
    .then(res => res.data);
};

/**
 * GET /offices/{officeCode}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/getOfficeByCode
 * @see {@link Office}
 * @returns {Promise<Offices.GetOfficeByCode.ResponseBody>}
 */
export const getOfficeByCode = ({ officeCode }: Offices.GetOfficeByCode.RequestParams) => {
  return apiClient.get<Offices.GetOfficeByCode.ResponseBody>(`/offices/${officeCode}`)
    .then(res => res.data);
};

/**
 * PUT /offices/{officeCode}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/updateOffice
 * @see {@link OfficeInput}
 * @see {@link Office}
 * @returns {Promise<Offices.UpdateOffice.ResponseBody>}
 */
export const updateOffice = (
  { officeCode }: Offices.UpdateOffice.RequestParams,
  officeData: Offices.UpdateOffice.RequestBody
) => {
  return apiClient.put<Offices.UpdateOffice.ResponseBody>(`/offices/${officeCode}`, officeData)
    .then(res => res.data);
};

/**
 * DELETE /offices/{officeCode}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Offices/operation/deleteOffice
 * @returns {Promise<Offices.DeleteOffice.ResponseBody>}
 */
export const deleteOffice = ({ officeCode }: Offices.DeleteOffice.RequestParams) => {
  return apiClient.delete<Offices.DeleteOffice.ResponseBody>(`/offices/${officeCode}`)
    .then(() => undefined);
};
