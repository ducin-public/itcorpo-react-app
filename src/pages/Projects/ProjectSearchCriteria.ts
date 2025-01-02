import { ProjectStatus } from "../../api/data-contracts";

export type ProjectSearchCriteria = {
  projectName?: string;
  statuses: ProjectStatus[];
  teamMemberName?: string;
  budgetMin?: number;
  budgetMax?: number;
};

export const initialProjectSearchCriteria: ProjectSearchCriteria = {
  statuses: [],
};
