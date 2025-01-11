export interface EmployeeSearchFilters {
  searchTerm: string;
  departments: string[];
  minSalary?: number;
  maxSalary?: number;
  skills: string;
}
