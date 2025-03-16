import { BenefitSubscription, BenefitSubscriptionInput, BenefitService, BenefitCharge } from '../contract-types/data-contracts';
import { apiClient, buildURLSearchParams } from './client';
import { Benefits } from '../contract-types/BenefitsRoute';

/**
 * A  cancelled subscription can be renewed.
 * An active subscription can be cancelled.
 */
type BenefitOperationBody = {
  operation: "CANCEL" | "RENEW";
};

/**
 * GET /benefits/services
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/getBenefitServices
 * @see {@link BenefitService}
 * @returns {Promise<Benefits.GetBenefitServices.ResponseBody>}
 */
export const getBenefitServices = () => {
  return apiClient.get<Benefits.GetBenefitServices.ResponseBody>('/benefits/services')
    .then(res => res.data);
};

/**
 * GET /benefits
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/getBenefitSubscriptions
 * @see {@link Benefits.GetBenefitSubscriptions.RequestQuery}
 * @see {@link BenefitSubscription}
 * @returns {Promise<Benefits.GetBenefitSubscriptions.ResponseBody>}
 */
export const getBenefitSubscriptions = (criteria: Benefits.GetBenefitSubscriptions.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Benefits.GetBenefitSubscriptions.ResponseBody>('/benefits', { params })
    .then(res => res.data);
};

/**
 * GET /benefits/{benefitId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/getBenefitSubscriptionById
 * @see {@link BenefitSubscription}
 * @returns {Promise<Benefits.GetBenefitSubscriptionById.ResponseBody>}
 */
export const getBenefitSubscriptionById = ({ benefitId }: Benefits.GetBenefitSubscriptionById.RequestParams) => {
  return apiClient.get<Benefits.GetBenefitSubscriptionById.ResponseBody>(`/benefits/${benefitId}`)
    .then(res => res.data);
};

/**
 * GET /benefits/count
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/getBenefitsCount
 * @see {@link Benefits.GetBenefitSubscriptions.RequestQuery}
 * @see {@link BenefitService}
 * @returns {Promise<Benefits.GetBenefitsCount.ResponseBody>}
 */
export const getBenefitsCount = (criteria: Benefits.GetBenefitsCount.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Benefits.GetBenefitsCount.ResponseBody>('/benefits/count', { params })
    .then(res => res.data);
};

/**
 * POST /benefits
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/createBenefit
 * @see {@link BenefitSubscriptionInput}
 * @see {@link BenefitService}
 * @returns {Promise<Benefits.CreateBenefit.ResponseBody>}
 */
export const createBenefitSubscription = (benefitData: Benefits.CreateBenefit.RequestBody) => {
  return apiClient.post<Benefits.CreateBenefit.ResponseBody>('/benefits', benefitData)
    .then(res => res.data);
};

/**
 * PUT /benefits/{benefitId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/updateBenefit
 * @see {@link BenefitSubscriptionInput}
 * @see {@link BenefitService}
 * @returns {Promise<Benefits.UpdateBenefit.ResponseBody>}
 */
export const updateBenefitSubscription = ({ benefitId }: Benefits.UpdateBenefit.RequestParams, benefitData: Benefits.UpdateBenefit.RequestBody) => {
  return apiClient.put<Benefits.UpdateBenefit.ResponseBody>(`/benefits/${benefitId}`, benefitData)
    .then(res => res.data);
};

/**
 * PATCH /benefits/{benefitId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/updateBenefitSubscriptionStatus
 * @see {@link BenefitOperationBody}
 * @see {@link BenefitService}
 * @returns {Promise<Benefits.UpdateBenefitSubscriptionStatus.ResponseBody>}
 */
export const cancelBenefitSubscription = ({ benefitId }: Benefits.UpdateBenefitSubscriptionStatus.RequestParams) => {
  const requestBody: BenefitOperationBody = { operation: "CANCEL" };
  return apiClient.patch<Benefits.UpdateBenefitSubscriptionStatus.ResponseBody>(`/benefits/${benefitId}`, requestBody).then(res => res.data);
};

/**
 * PATCH /benefits/{benefitId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/updateBenefitSubscriptionStatus
 * @see {@link BenefitOperationBody}
 * @see {@link BenefitService}
 * @returns {Promise<Benefits.UpdateBenefitSubscriptionStatus.ResponseBody>}
 */
export const renewBenefitSubscription = ({ benefitId }: Benefits.UpdateBenefitSubscriptionStatus.RequestParams) => {
  const requestBody: BenefitOperationBody = { operation: "RENEW" };
  return apiClient.patch<Benefits.UpdateBenefitSubscriptionStatus.ResponseBody>(`/benefits/${benefitId}`, requestBody).then(res => res.data);
};

/**
 * GET /benefits/charges
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/getBenefitCharges
 * @see {@link Benefits.GetBenefitCharges.RequestQuery}
 * @see {@link BenefitCharge}
 * @returns {Promise<Benefits.GetBenefitCharges.ResponseBody>}
 */
export const getBenefitCharges = (criteria: Benefits.GetBenefitCharges.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Benefits.GetBenefitCharges.ResponseBody>(`/benefits/charges`, { params })
    .then(res => res.data);
};

/**
 * GET /benefits/{benefitId}/charges
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Benefits/operation/getBenefitSubscriptionCharges
 * @see {@link Benefits.GetBenefitSubscriptionCharges.RequestQuery}
 * @see {@link BenefitCharge}
 * @returns {Promise<Benefits.GetBenefitSubscriptionCharges.ResponseBody>}
 */
export const getBenefitSubscriptionCharges = ({ benefitId }: Benefits.GetBenefitSubscriptionCharges.RequestParams, criteria: Benefits.GetBenefitSubscriptionCharges.RequestQuery = {}) => {
  const params = buildURLSearchParams(criteria);
  return apiClient.get<Benefits.GetBenefitSubscriptionCharges.ResponseBody>(`/benefits/${benefitId}/charges`, { params })
    .then(res => res.data);
};
