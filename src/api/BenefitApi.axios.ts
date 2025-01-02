import { apiClient } from './client';
import type { Benefit, BenefitInput } from './data-contracts';

export const getBenefits = () => {
  return apiClient.get<Benefit[]>('/benefits')
    .then(res => res.data);
};

export const getBenefit = (id: Benefit['id']) => {
  return apiClient.get<Benefit>(`/benefits/${id}`)
    .then(res => res.data);
};

export const getBenefitsCount = () => {
  return apiClient.get<number>('/benefits/count')
    .then(res => res.data);
};

export const createBenefit = (benefit: BenefitInput) => {
  return apiClient.post<Benefit>('/benefits', benefit)
    .then(res => res.data);
};

export const updateBenefit = (id: Benefit['id'], benefit: Partial<BenefitInput>) => {
  return apiClient.put<Benefit>(`/benefits/${id}`, benefit)
    .then(res => res.data);
};

export const deleteBenefit = (id: Benefit['id']) => {
  return apiClient.delete<void>(`/benefits/${id}`)
    .then(() => undefined);
};
