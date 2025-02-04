import { queryOptions } from "@tanstack/react-query";

import { BenefitSubscription } from "../contract-types/data-contracts";
import { Benefits } from "../contract-types/BenefitsRoute";
import { getBenefitCharges, getBenefitSubscriptionById, getBenefitSubscriptions } from "./BenefitApi.axios";

type BenefitSubscriptionListQueryParams = Benefits.GetBenefitSubscriptions.RequestQuery
export function benefitSubscriptionListQuery(params: BenefitSubscriptionListQueryParams){
  return queryOptions({
    queryKey: ['benefit', 'subscriptions', 'list', params],
    queryFn: () => getBenefitSubscriptions(params),
  })
}

export function benefitSubscriptionDetailsQuery(benefitId: BenefitSubscription['id']){
  return queryOptions({
    queryKey: ['benefit', 'subscriptions', 'details', benefitId],
    queryFn: () => getBenefitSubscriptionById({ benefitId }),
  })
}
  
type BenefitChargesListQueryParams = Benefits.GetBenefitCharges.RequestQuery
export function benefitChargesListQuery(params: BenefitChargesListQueryParams){
  return queryOptions({
    queryKey: ['benefit', 'charges', 'list', params],
    queryFn: () => getBenefitCharges(params),
  })
}
