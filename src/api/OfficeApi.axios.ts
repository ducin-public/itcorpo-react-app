import { apiClient } from './client';
import type { Office, OfficeInput, OfficeAmenity } from './data-contracts';

export interface OfficeSearchCriteria {
  countries?: string[];
  amenities?: OfficeAmenity['code'][];
}

export const getOffices = (criteria: OfficeSearchCriteria = {}) => {
  const params = new URLSearchParams();
  
  if (criteria?.countries?.length) {
    params.append('country', criteria.countries.join(','));
  }
  if (criteria?.amenities?.length) {
    params.append('amenities', criteria.amenities.join(','));
  }

  return apiClient.get<Office[]>('/offices', { params })
    .then(res => res.data);
};

export const getOfficesCount = () => {
  return apiClient.get<number>('/offices/count')
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
