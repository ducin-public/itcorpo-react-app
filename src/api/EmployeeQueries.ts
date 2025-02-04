import { queryOptions } from "@tanstack/react-query";

import { getEmployeeById, getEmployeeProjects, getEmployees, getEmployeesSearchFeed } from "./EmployeeApi.axios";
import { Employee } from "../contract-types/data-contracts";
import { Employees } from "../contract-types/EmployeesRoute";

type EmployeeListQueryParams = Employees.GetEmployees.RequestQuery
export function employeeListQuery({ group, ...params }: EmployeeListQueryParams) {
  return queryOptions({
    queryKey: ['employees', 'list', { group }, params] as const,
    queryFn: () => getEmployees(params),
  })
}

export function employeeDetailsQuery(employeeId: Employee['id']) {
  return queryOptions({
    queryKey: ['employee', 'details', employeeId],
    queryFn: () => getEmployeeById({ employeeId })
  })
}

export function employeeProjectsListQuery(employeeId: Employee['id']) {
  return queryOptions({
    queryKey: ['employee', 'details', employeeId, 'projects', 'list'],
    queryFn: () => getEmployeeProjects({ employeeId })
  })
}

type EmployeesSearchFeedQueryParams = Employees.GetEmployeesSearchFeed.RequestQuery
export function employeesSearchFeedQuery(params: EmployeesSearchFeedQueryParams) {
  return queryOptions({
    queryKey: ['employees', 'search-feed', params],
    queryFn: () => getEmployeesSearchFeed(params),
  })
}
