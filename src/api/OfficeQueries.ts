import { queryOptions } from "@tanstack/react-query";

import { getOfficeByCode, getOffices } from "./OfficeApi.axios";
import { Office } from "../contract-types/data-contracts";
import { Offices } from "../contract-types/OfficesRoute";

const officeQueryKeys = {
  all: ['offices'] as const,
  allLists: ['offices', 'list'] as const,
  list(params: Offices.GetOffices.RequestQuery) {
    return [...officeQueryKeys.allLists, params] as const;
  },
  allDetails: ['office', 'details'] as const,
  details(officeCode: Office['code']) {
    return [...officeQueryKeys.allDetails, officeCode] as const;
  },
}

type OfficeListQueryParams = Offices.GetOffices.RequestQuery
export const officesListQuery = (params: OfficeListQueryParams) => queryOptions({
  queryKey: officeQueryKeys.list(params),
  queryFn: () => getOffices(params),
})

export const officeDetailsQuery = (officeCode: Office['code']) => queryOptions({
  queryKey: officeQueryKeys.details(officeCode),
  queryFn: () => getOfficeByCode({ officeCode }),
})
