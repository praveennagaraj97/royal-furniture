'use client';

import { apiFetcherWithGuest } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { PaymentProceedResponse } from '@/types/response/cart';
import useSWR from 'swr';

interface UseGetCartPaymentStepProps {
  guestSessionId?: string | null;
  enabled?: boolean;
}

export const useGetCartPaymentStep = ({
  guestSessionId,
  enabled = true,
}: UseGetCartPaymentStepProps = {}) => {
  const key = enabled
    ? [API_ROUTES.CART.PAYMENT_PROCEED, guestSessionId || undefined]
    : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<PaymentProceedResponse>(
      key,
      ([url, session]) =>
        apiFetcherWithGuest<PaymentProceedResponse>(url, session),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
      },
    );

  return {
    data,
    paymentData: data?.data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetCartPaymentStep;
