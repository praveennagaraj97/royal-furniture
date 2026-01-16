'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { WishlistCollectionsResponse } from '@/types/response';
import { useAuth } from '@/contexts/auth-context';
import useSWR from 'swr';

export const useGetWishlistCollections = () => {
  const { isAuthenticated } = useAuth();
  
  const { data, error, isLoading, mutate } =
    useSWR<WishlistCollectionsResponse>(
      isAuthenticated ? API_ROUTES.WISHLIST.COLLECTIONS : null,
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
