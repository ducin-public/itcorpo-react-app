import { apiClient } from './client';
import type { Office, OfficeInput, OfficeAmenity } from './data-contracts';

export const getOffices = () => {
  return apiClient.get<Office[]>('/offices')
    .then(res => res.data);
};

export const getOfficesCount = () => {
  return apiClient.get<number>('/offices/count')
    .then(res => res.data);
};

export const getOffice = (id: string) => {
  return apiClient.get<Office>(`/offices/${id}`)
    .then(res => res.data);
};

export const createOffice = (office: OfficeInput) => {
  return apiClient.post<Office>('/offices', office)
    .then(res => res.data);
};

export const updateOffice = (id: string, office: Partial<OfficeInput>) => {
  return apiClient.put<Office>(`/offices/${id}`, office)
    .then(res => res.data);
};

export const deleteOffice = (id: string) => {
  return apiClient.delete<void>(`/offices/${id}`)
    .then(() => undefined);
};

export const getOfficeAmenities = () => {
  return apiClient.get<OfficeAmenity[]>('/offices/amenities')
    .then(res => res.data);
};
