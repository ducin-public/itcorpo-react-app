import { queryOptions } from "@tanstack/react-query";

import { getDepartments } from "./DepartmentApi.axios";

export const departmentsListQuery = queryOptions({
  queryKey: ['departments', 'list'],
  queryFn: getDepartments,
  staleTime: 60 * 1000,
})
