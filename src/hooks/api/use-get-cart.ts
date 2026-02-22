'use client';

import { apiFetcherWithGuest } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { CartApiResponse } from '@/types/response/cart';
import useSWR from 'swr';

interface UseGetCartProps {
  guestSessionId?: string | null;
  enabled?: boolean;
}

export const useGetCart = ({
  guestSessionId,
  enabled = true,
}: UseGetCartProps = {}) => {
  const key = enabled
    ? [API_ROUTES.CART.DETAIL, guestSessionId || undefined]
    : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<CartApiResponse>(
      key,
      ([url, session]) => apiFetcherWithGuest<CartApiResponse>(url, session),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
      },
    );

  return {
    data,
    cartData: data?.data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetCart;
