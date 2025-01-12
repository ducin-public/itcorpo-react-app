import { ProjectStatus } from "../../contract-types/data-contracts";

export type TeamMemberFiltering = "ANY" | "ALL";

export type ProjectSearchFilters = {
  projectName?: string;
  statuses: ProjectStatus[];
  teamMemberName?: string;
  teamMemberFiltering: TeamMemberFiltering;
  budgetMin?: number;
  budgetMax?: number;
};
