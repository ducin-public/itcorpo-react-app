import { ProjectStatus } from "../../contract-types/data-contracts";

export const projectStatusDict: Record<ProjectStatus, string> = {
  ACTIVE: 'Active',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  PLANNING: 'Planning',
};

export const projectStatusOptions = Object.entries(projectStatusDict).map(([value, label]) => ({
  value,
  label,
}));
