'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { WishlistCollectionsResponse } from '@/types/response';
import useSWR from 'swr';

export const useGetWishlistCollections = () => {
  const { data, error, isLoading, mutate } =
    useSWR<WishlistCollectionsResponse>(
      API_ROUTES.WISHLIST.COLLECTIONS,
      apiFetcher<WishlistCollectionsResponse>,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  return {
    collections: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};
