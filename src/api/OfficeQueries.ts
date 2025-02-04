import { queryOptions } from "@tanstack/react-query";

import { getOfficeByCode, getOffices } from "./OfficeApi.axios";
import { Office } from "../contract-types/data-contracts";
import { Offices } from "../contract-types/OfficesRoute";

type OfficeListQueryParams = Offices.GetOffices.RequestQuery
export const officesListQuery = (params: OfficeListQueryParams) => queryOptions({
  queryKey: ['offices', 'list', params] as const,
  queryFn: () => getOffices(params),
})

export const officeDetailsQuery = (officeCode: Office['code']) => queryOptions({
  queryKey: ['office', 'details', officeCode],
  queryFn: () => getOfficeByCode({ officeCode }),
})
