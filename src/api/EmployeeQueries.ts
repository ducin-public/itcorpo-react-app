import { queryOptions } from "@tanstack/react-query";

import { getEmployeeProjects } from "./EmployeeApi.axios";
import { Employee } from "../contract-types/data-contracts";

export function employeeProjectOptions(employeeId: Employee['id']) {
  return queryOptions({
    queryKey: ['employee', employeeId, 'projects', 'list'],
    queryFn: () => getEmployeeProjects({ employeeId })
  })
}
