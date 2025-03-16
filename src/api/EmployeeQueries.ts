import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEmployee, getEmployeeById, getEmployeeEditData, getEmployeeProjects, getEmployees, getEmployeesSearchFeed, updateEmployee } from "./EmployeeApi.axios";
import { Employee, EmployeeInput } from "../contract-types/data-contracts";
import { Employees } from "../contract-types/EmployeesRoute";
import { useNotifications } from "../components/Notifications/NotificationContext";

const employeeQueryKeys = {
  all: ['employees'] as const,
  allLists: ['employees', 'list'] as const,
  list({ group, ...params }: EmployeeListQueryParams) {
    return [...employeeQueryKeys.allLists, { group }, params] as const;
  },
  allSearchFeeds: ['employees', 'search-feed'] as const,
  searchFeed(params: EmployeesSearchFeedQueryParams) {
    return [...employeeQueryKeys.allSearchFeeds, params] as const;
  },
  allDetails: ['employee', 'details'] as const,
  edit(employeeId: Employee['id']) {
    return ['employee', 'edit', employeeId] as const;
  },
  details(employeeId: Employee['id']) {
    return [...employeeQueryKeys.allDetails, employeeId] as const;
  },
  projects(employeeId: Employee['id']) {
    return [...employeeQueryKeys.details(employeeId), 'projects', 'list'] as const;
  },
}

type EmployeeListQueryParams = Employees.GetEmployees.RequestQuery
export function employeeListQuery({ group, ...params }: EmployeeListQueryParams) {
  return queryOptions({
    queryKey: employeeQueryKeys.list({ group, ...params }),
    queryFn: () => getEmployees(params),
  })
}

export function employeeDetailsQuery(employeeId: Employee['id']) {
  return queryOptions({
    queryKey: employeeQueryKeys.details(employeeId),
    queryFn: () => getEmployeeById({ employeeId })
  })
}

export function getEmployeeEditDataQuery(employeeId: Employee['id']) {
  return queryOptions({
    queryKey: employeeQueryKeys.edit(employeeId),
    queryFn: () => getEmployeeEditData({ employeeId })
  })
}

export function employeeProjectsListQuery(employeeId: Employee['id']) {
  return queryOptions({
    queryKey: employeeQueryKeys.projects(employeeId),
    queryFn: () => getEmployeeProjects({ employeeId })
  })
}

type EmployeesSearchFeedQueryParams = Employees.GetEmployeesSearchFeed.RequestQuery
export function employeesSearchFeedQuery(params: EmployeesSearchFeedQueryParams) {
  return queryOptions({
    queryKey: employeeQueryKeys.searchFeed(params),
    queryFn: () => getEmployeesSearchFeed(params),
    gcTime: 0 // we decided that this one shall not be cached client-side
  })
}

export const useDeleteEmployeeMutation = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const deleteMutation = useMutation({
    mutationKey: ['employee', 'delete'],
    mutationFn: ({ employeeId }: { employeeId: Employee['id'], name: string }) =>
      deleteEmployee({ employeeId }),
    onSuccess: (_result, { employeeId, name }) => {
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.allLists });
      queryClient.removeQueries({ queryKey: employeeQueryKeys.details(employeeId) });
      queryClient.removeQueries({ queryKey: employeeQueryKeys.edit(employeeId) });
      addNotification('notice', `Employee ${name} deleted successfully`);
    },
    onError: (error, { name }) => {
      addNotification('error', `Failed to delete employee ${name}: ${error.message}`);
    }
  });

  return deleteMutation
}

export const useUpdateEmployeeMutation = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const updateMutation = useMutation({
    mutationFn: ({ employeeId, data }: { employeeId: Employee['id'], name: string, data: EmployeeInput }) =>
      updateEmployee({ employeeId: employeeId }, data),
    onSuccess: (_result, { employeeId, name }) => {
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.allLists });
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.details(employeeId) });
      addNotification('info', `Employee ${name} updated successfully`);
    },
    onError: (error, { name }) => {
      addNotification('error', `Failed to update employee ${name}: ${error.message}`);
    }
  });

  return updateMutation;
}
