'use client';

import { apiFetcherWithGuest } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ShippingProceedResponse } from '@/types/response/cart';
import useSWR from 'swr';

interface UseGetCartShippingStepProps {
  guestSessionId?: string | null;
  enabled?: boolean;
}

export const useGetCartShippingStep = ({
  guestSessionId,
  enabled = true,
}: UseGetCartShippingStepProps = {}) => {
  const key = enabled
    ? [API_ROUTES.CART.SHIPPING_PROCEED, guestSessionId || undefined]
    : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<ShippingProceedResponse>(
      key,
      ([url, session]) =>
        apiFetcherWithGuest<ShippingProceedResponse>(url, session),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
      },
    );

  return {
    data,
    shippingData: data?.data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetCartShippingStep;
