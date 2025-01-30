import { queryOptions } from "@tanstack/react-query";

import { getGeo } from "./GeoApi.axios";

export const geoQuery = queryOptions({
  queryKey: ['geo'],
  queryFn: getGeo,
  staleTime: Infinity,
})
