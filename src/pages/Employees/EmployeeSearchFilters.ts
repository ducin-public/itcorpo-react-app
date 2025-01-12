export type SkillsFiltering = "ANY" | "ALL";

export interface EmployeeSearchFilters {
  searchTerm: string;
  departments: string[];
  minSalary?: number;
  maxSalary?: number;
  skills: string;
  skillsFiltering: SkillsFiltering;
}
