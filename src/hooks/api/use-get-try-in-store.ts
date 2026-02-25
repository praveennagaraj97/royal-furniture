'use client';

import { apiFetcherWithGuest } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type {
  TryInStoreResponse,
  TryInStoreStore,
} from '@/types/response/store';
import { getOrCreateGuestSession } from '@/utils/guest-session';
import useSWR from 'swr';

interface UseGetTryInStoreProps {
  productSlug?: string;
  search?: string;
  latitude?: number;
  longitude?: number;
  enabled?: boolean;
}

export const useGetTryInStore = ({
  productSlug,
  search,
  latitude,
  longitude,
  enabled = true,
}: UseGetTryInStoreProps = {}) => {
  const guestSessionId =
    typeof window !== 'undefined' ? getOrCreateGuestSession() : null;

  const key =
    enabled && productSlug
      ? [
          API_ROUTES.PRODUCTS.TRY_IN_STORE(productSlug),
          search || '',
          latitude ?? null,
          longitude ?? null,
          guestSessionId || undefined,
        ]
      : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<TryInStoreResponse>(
      key,
      ([url, searchParam, lat, long, session]) => {
        const searchParams = new URLSearchParams();
        if (searchParam) searchParams.set('search', String(searchParam));
        if (lat != null && long != null) {
          searchParams.set('latitude', String(lat));
          searchParams.set('longitude', String(long));
        }
        const finalUrl =
          searchParams.toString() !== '' ? `${url}?${searchParams}` : url;
        return apiFetcherWithGuest<TryInStoreResponse>(
          finalUrl,
          session as string | undefined,
        );
      },
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
      },
    );

  const stores: TryInStoreStore[] | undefined =
    data?.data?.store?.results ?? undefined;

  return {
    data,
    stores,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetTryInStore;
