import { apiClient } from './client';
import type { Office, OfficeInput, OfficeAmenity, OfficesSearchCriteria } from './data-contracts';

const buildOfficeSearchParams = (criteria: OfficesSearchCriteria = {}): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (criteria.countries?.length) {
    params.append('countries', criteria.countries);
  }
  if (criteria.amenities?.length) {
    params.append('amenities', criteria.amenities);
  }
  if (criteria.phrase){
    params.append('phrase', criteria.phrase);
  }

  return params;
};

export const getOffices = (criteria: OfficesSearchCriteria = {}) => {
  const params = buildOfficeSearchParams(criteria);
  return apiClient.get<Office[]>('/offices', { params })
    .then(res => res.data);
};

export const getOfficesCount = (criteria: OfficesSearchCriteria = {}) => {
  const params = buildOfficeSearchParams(criteria);
  return apiClient.get<number>('/offices/count', { params })
    .then(res => res.data);
};

export const getOffice = (code: string) => {
  return apiClient.get<Office>(`/offices/${code}`)
    .then(res => res.data);
};

export const createOffice = (office: OfficeInput) => {
  return apiClient.post<Office>('/offices', office)
    .then(res => res.data);
};

export const updateOffice = (code: string, office: Partial<OfficeInput>) => {
  return apiClient.put<Office>(`/offices/${code}`, office)
    .then(res => res.data);
};

export const deleteOffice = (code: string) => {
  return apiClient.delete<void>(`/offices/${code}`)
    .then(() => undefined);
};

export const getOfficeAmenities = () => {
  return apiClient.get<OfficeAmenity[]>('/offices/amenities')
    .then(res => res.data);
};
