import type { BenefitSubscriptionSearchStatus, DateString, Employee, Money, BenefitCategory } from '../../api/data-contracts';

export const BenefitSubscriptionSearchStatusDict = {
  'ALL': 'All',
  'ACTIVE': 'Active',
  'CANCELLED': 'Cancelled'
}

export interface BenefitSearchCriteria {
  service?: string;
  fee?: {
    from?: Money;
    to?: Money;
  }
  employeeIds?: Employee['id'][];
  status?: BenefitSubscriptionSearchStatus;
  activePeriod?: {
    from?: DateString;
    to?: DateString;
  };
}

export interface BenefitSearchState {
  serviceName: string;
  selectedEmployees: string[];
  selectedCategories: BenefitCategory[];
  feeRange: { from?: number; to?: number };
  selectedStatus: BenefitSubscriptionSearchStatus;
}
