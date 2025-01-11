import type { BenefitSubscriptionSearchStatus, BenefitCategory } from '../../contract-types/data-contracts';

export const BenefitSubscriptionSearchStatusDict: {
  [key in BenefitSubscriptionSearchStatus]: string;
} = {
  'ALL': 'All',
  'ACTIVE': 'Active',
  'CANCELLED': 'Cancelled'
}

export interface BenefitSearchFilters {
  serviceName: string;
  selectedEmployees: string[];
  selectedCategories: BenefitCategory[];
  feeRange: { from?: number; to?: number };
  selectedStatus: BenefitSubscriptionSearchStatus;
}
