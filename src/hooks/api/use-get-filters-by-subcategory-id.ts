'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';

import type { FilterViewResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetFiltersBySubCategoryIdProps {
  subcategoryId: number | null;
}

export const useGetFiltersBySubCategoryId = ({
  subcategoryId,
}: UseGetFiltersBySubCategoryIdProps) => {
  const url = subcategoryId
    ? `${API_ROUTES.PRODUCTS.FILTER_VIEW}?subcategory_id=${subcategoryId}`
    : null;

  const { data, error, isLoading, mutate } = useSWR<FilterViewResponse>(
    url,
    apiFetcher<FilterViewResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    filters: data?.data || [],
    isLoading,
    error,
    mutate,
  };
};
