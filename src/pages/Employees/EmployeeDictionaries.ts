import { ContractType, Nationality, EngagementLevel } from "../../contract-types/data-contracts";

export const contractTypeDict: Record<ContractType, string> = {
  CONTRACT: 'Contract',
  PERMANENT: 'Permanent',
};

export const engagementLevelDict: Record<EngagementLevel, string> = {
  ON_DEMAND: 'On Demand',
  HALF_TIME: 'Half Time',
  PARTIAL_PLUS: 'Partial Plus',
  FULL_TIME: 'Full Time',
};

export const nationalityDict: Record<Nationality, string> = {
  'DE': 'German',
  'ES': 'Spanish',
  'FR': 'French',
  'IN': 'Indian',
  'IT': 'Italian',
  'NL': 'Dutch',
  'PL': 'Polish',
  'UK': 'British',
  'US': 'American',
};

export const nationalFlags: Record<Nationality, string> = {
  'DE': '🇩🇪',
  'ES': '🇪🇸',
  'FR': '🇫🇷',
  'IN': '🇮🇳',
  'IT': '🇮🇹',
  'NL': '🇳🇱',
  'PL': '🇵🇱',
  'UK': '🇬🇧',
  'US': '🇺🇸',
};

export type EmployeeGroup = "ACTIVE" | "INVOLVED" | "JOBLESS" | "DEPARTING" | "NEW_HIRES" | "PAST"

export const employeeGroupDict: Record<EmployeeGroup, string> = {
  ACTIVE: 'Active Employees',
  INVOLVED: 'Involved Employees',
  JOBLESS: 'Jobless Employees',
  DEPARTING: 'Departing Employees',
  NEW_HIRES: 'New Hires',
  PAST: 'Past Employees',
};
