import { ProjectStatus } from "../../contract-types/data-contracts";

export type ProjectSearchFilters = {
  projectName?: string;
  statuses: ProjectStatus[];
  teamMemberName?: string;
  budgetMin?: number;
  budgetMax?: number;
};
