'use client';

import { apiFetcherWithGuest } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { StoresByCartResponse } from '@/types/response/store';
import useSWR from 'swr';

interface UseGetStoresByCartProps {
  cartId?: string | null;
  guestSessionId?: string | null;
  enabled?: boolean;
}

export const useGetStoresByCart = ({
  cartId,
  guestSessionId,
  enabled = true,
}: UseGetStoresByCartProps = {}) => {
  const key =
    enabled && cartId
      ? [API_ROUTES.STORES.BY_CART, cartId, guestSessionId || undefined]
      : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<StoresByCartResponse>(
      key,
      ([url, id, session]) =>
        apiFetcherWithGuest<StoresByCartResponse>(
          `${url}?cart_id=${id}`,
          session,
        ),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
      },
    );

  return {
    data,
    stores: data?.data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetStoresByCart;
