'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import { useAuth } from '@/contexts/auth-context';
import type { ProductItem } from '@/types/response';
import useSWR from 'swr';

interface WishlistCollectionItem {
  id: number;
  product: ProductItem;
  added_at: string;
}

interface WishlistCollectionDetail {
  id: number;
  title: string;
  is_default: boolean;
  total_items: number;
  items: WishlistCollectionItem[];
  created_at?: string;
}

export const useGetWishlistCollection = (id?: string | number | null) => {
  const { isAuthenticated } = useAuth();

  const key =
    isAuthenticated && id ? `${API_ROUTES.WISHLIST.COLLECTIONS}${id}/` : null;

  const { data, error, isLoading, mutate } = useSWR<{
    data: WishlistCollectionDetail;
  }>(key, apiFetcher<{ data: WishlistCollectionDetail }>, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    collection: data?.data || null,
    isLoading,
    error,
    mutate,
  };
};
