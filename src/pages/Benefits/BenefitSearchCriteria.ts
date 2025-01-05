import type { DateString, Employee, Money } from '../../api/data-contracts';

export enum BENEFIT_SUBSCRIPTION_STATUS {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED'
}

export interface BenefitSearchCriteria {
  service?: string;
  fee?: Money;
  employeeIds?: Employee['id'][];
  status?: BENEFIT_SUBSCRIPTION_STATUS;
  activePeriod?: {
    from?: DateString;
    to?: DateString;
  };
}
