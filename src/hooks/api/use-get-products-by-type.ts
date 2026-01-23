'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ProductListingResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetProductsByTypeProps {
  type?: string | null;
  sort?: string;
  enabled?: boolean;
}

export const useGetProductsByType = ({
  type,
  sort,
  enabled = true,
}: UseGetProductsByTypeProps) => {
  const params = new URLSearchParams();

  if (type) {
    params.append('type', type);
  }
  if (sort) {
    params.append('sort', sort);
  }

  const queryString = params.toString();
  const url =
    enabled && type ? `${API_ROUTES.PRODUCTS.VIEW_ALL}?${queryString}` : null;

  const { data, error, isLoading, mutate } = useSWR<ProductListingResponse>(
    url,
    apiFetcher<ProductListingResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: 0,
    },
  );

  return {
    products: data?.data?.results || [],
    totalCount: data?.data?.count || 0,
    next: data?.data?.next || null,
    previous: data?.data?.previous || null,
    isLoading,
    error,
    mutate,
    query: type,
  };
};
