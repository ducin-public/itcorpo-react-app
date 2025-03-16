import { queryOptions } from "@tanstack/react-query";

import { getDepartments } from "./DepartmentApi.axios";

const departmentQueryKeys = {
  all: ['departments'] as const,
  allLists: ['departments', 'list'] as const,
  list() {
    return [...departmentQueryKeys.allLists] as const;
  },
}

export const departmentsListQuery = queryOptions({
  queryKey: departmentQueryKeys.list(),
  queryFn: getDepartments,
  staleTime: 60 * 1000,
})
