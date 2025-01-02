export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  department: string;
  position: string;
  skills: string[];
  salary: number;
  hireDate: string;
  profileImage: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  employees: Employee[];
}

export interface Office {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  capacity: number;
  monthlyCost: number;
  image: string;
  amenities: string[];
}

export type BenefitType = 'health' | 'dental' | 'vision' | 'life';

export interface Benefit {
  id: string;
  type: BenefitType;
  provider: string;
  description: string;
  monthlyFee: number;
  coverageDetails: string;
  employeeId: string;
  startDate: string;
  endDate: string | null;
}

export interface FinancialSummary {
  period: string;
  employeeCosts: number;
  officeCosts: number;
  benefitCosts: number;
  total: number;
  location: string;
}