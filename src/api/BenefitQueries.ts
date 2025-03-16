import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { BenefitSubscription } from "../contract-types/data-contracts";
import { Benefits } from "../contract-types/BenefitsRoute";
import { createBenefitSubscription, getBenefitCharges, getBenefitSubscriptionById, getBenefitSubscriptions } from "./BenefitApi.axios";
import { useNotifications } from "../components/Notifications/NotificationContext";

const subscriptionsQueryKeys = {
  all: ['benefit', 'subscriptions'] as const,
  allLists: ['benefit', 'subscriptions', 'list'] as const,
  list(params: Benefits.GetBenefitSubscriptions.RequestQuery) {
    return [...subscriptionsQueryKeys.allLists, params] as const;
  },
  allDetails: ['benefit', 'subscriptions', 'details'] as const,
  details(benefitId: BenefitSubscription['id']) {
    return [...subscriptionsQueryKeys.allDetails, benefitId] as const;
  },
}

const chargesQueryKeys = {
  all: ['benefit', 'charges'] as const,
  allLists: ['benefit', 'charges', 'list'] as const,
  list(params: Benefits.GetBenefitCharges.RequestQuery) {
    return [...chargesQueryKeys.allLists, params] as const;
  },
  allDetails: ['benefit', 'charges', 'details'] as const,
  details(benefitId: BenefitSubscription['id']) {
    return [...chargesQueryKeys.allDetails, benefitId] as const;
  },
}

type BenefitSubscriptionListQueryParams = Benefits.GetBenefitSubscriptions.RequestQuery
export function benefitSubscriptionListQuery(params: BenefitSubscriptionListQueryParams){
  return queryOptions({
    queryKey: subscriptionsQueryKeys.list(params),
    queryFn: () => getBenefitSubscriptions(params),
  })
}

export function benefitSubscriptionDetailsQuery(benefitId: BenefitSubscription['id']){
  return queryOptions({
    queryKey: subscriptionsQueryKeys.details(benefitId),
    queryFn: () => getBenefitSubscriptionById({ benefitId }),
  })
}
  
type BenefitChargesListQueryParams = Benefits.GetBenefitCharges.RequestQuery
export function benefitChargesListQuery(params: BenefitChargesListQueryParams){
  return queryOptions({
    queryKey: chargesQueryKeys.list(params),
    queryFn: () => getBenefitCharges(params),
  })
}

export const useCreateBenefitSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: createBenefitSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionsQueryKeys.allLists });
      addNotification('info', 'Benefit subscription created successfully');
    },
    onError: (error) => {
      addNotification('error', `Failed to create benefit subscription: ${error}`);
    },
  });
}
