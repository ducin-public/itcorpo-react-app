import { apiClient } from './client';
import type { BenefitSubscription, BenefitSubscriptionInput, BenefitsSearchCriteria } from './data-contracts';

const buildBenefitSearchParams = (criteria: BenefitsSearchCriteria = {}): URLSearchParams => {
  const params = new URLSearchParams();

  if (criteria.serviceName) {
    params.append('serviceName', criteria.serviceName);
  }
  if (criteria.categories?.length) {
    params.append('categories', criteria.categories);
  }
  if (criteria.employeeIds?.length) {
    params.append('employeeIds', criteria.employeeIds);
  }
  if (criteria.feeFrom) {
    params.append('feeFrom', criteria.feeFrom);
  }
  if (criteria.feeTo) {
    params.append('feeTo', criteria.feeTo);
  }
  if (criteria.status) {
    params.append('status', criteria.status);
  }

  return params;
}

export const getBenefits = (criteria: BenefitsSearchCriteria = {}) => {
  const params = buildBenefitSearchParams(criteria);
  return apiClient.get<BenefitSubscription[]>('/benefits', { params })
    .then(res => res.data);
};

export const getBenefit = (id: BenefitSubscription['id']) => {
  return apiClient.get<BenefitSubscription>(`/benefits/${id}`)
    .then(res => res.data);
};

export const getBenefitsCount = (criteria: BenefitsSearchCriteria = {}) => {
  const params = buildBenefitSearchParams(criteria);
  return apiClient.get<number>('/benefits/count', { params })
    .then(res => res.data);
};

export const createBenefit = (benefit: BenefitSubscriptionInput) => {
  return apiClient.post<BenefitSubscription>('/benefits', benefit)
    .then(res => res.data);
};

export const updateBenefit = (id: BenefitSubscription['id'], benefit: Partial<BenefitSubscriptionInput>) => {
  return apiClient.put<BenefitSubscription>(`/benefits/${id}`, benefit)
    .then(res => res.data);
};

export const deleteBenefit = (id: BenefitSubscription['id']) => {
  return apiClient.delete<void>(`/benefits/${id}`)
    .then(() => undefined);
};
