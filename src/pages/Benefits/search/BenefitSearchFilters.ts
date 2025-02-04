import type { BenefitSubscriptionSearchStatus, BenefitCategory } from '../../../contract-types/data-contracts';

export const BenefitSubscriptionSearchStatusDict: {
  [key in BenefitSubscriptionSearchStatus]: string;
} = {
  'ALL': 'All',
  'ACTIVE': 'Active',
  'CANCELLED': 'Cancelled'
}

export interface BenefitSearchFilters {
  serviceName: string;
  beneficiaryEmployee: string;
  categories: BenefitCategory[];
  feeRange: { from?: number; to?: number };
  selectedStatus: BenefitSubscriptionSearchStatus;
}

export const emptyBenefitSearchFilters: BenefitSearchFilters = {
  serviceName: '',
  categories: [],
  beneficiaryEmployee: '',
  feeRange: {},
  selectedStatus: 'ACTIVE'
}
