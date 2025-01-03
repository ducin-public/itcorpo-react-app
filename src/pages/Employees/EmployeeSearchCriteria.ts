export interface EmployeeSearchCriteria {
  searchTerm: string;
  departments: string[];
  minSalary?: number;
  maxSalary?: number;
  skills: string;
}
