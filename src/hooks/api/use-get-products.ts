'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ProductListingResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetProductsProps {
  sub_category_id?: string | null;
  category_id?: string | null;
  q?: string;
  color_ids?: string;
  size_ids?: string;
  type_ids?: string;
  capacity?: string;
  price_min?: number | string;
  price_max?: number | string;
  country_id?: number | string;
  sort?: string;
  enabled?: boolean;
  [key: string]: unknown;
}

export const useGetProducts = ({
  sub_category_id,
  category_id,
  q,
  color_ids,
  size_ids,
  type_ids,
  capacity,
  price_min,
  price_max,
  country_id,
  sort,
  enabled = true,
  ...dynamicFilters
}: UseGetProductsProps) => {
  const params = new URLSearchParams();

  if (sub_category_id) {
    params.append('sub_category_id', sub_category_id);
  }
  if (category_id) {
    params.append('category_id', category_id);
  }
  if (q) {
    params.append('q', q);
  }
  if (color_ids) {
    params.append('color_ids', color_ids);
  }
  if (size_ids) {
    params.append('size_ids', size_ids);
  }
  if (type_ids) {
    params.append('type_ids', type_ids);
  }
  if (capacity) {
    params.append('capacity', capacity);
  }
  if (price_min !== undefined && price_min !== null) {
    params.append('price_min', String(price_min));
  }
  if (price_max !== undefined && price_max !== null) {
    params.append('price_max', String(price_max));
  }
  if (country_id !== undefined && country_id !== null) {
    params.append('country_id', String(country_id));
  }
  if (sort) {
    params.append('sort', sort);
  }

  // Add dynamic filter parameters (filter_<key> format)
  Object.entries(dynamicFilters).forEach(([key, value]) => {
    if (key.startsWith('filter_') && value) {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  const url =
    enabled && (sub_category_id || category_id || q)
      ? `${API_ROUTES.PRODUCTS.LISTING}?${queryString}`
      : null;

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
    count: data?.data?.count || 0,
    next: data?.data?.next || null,
    previous: data?.data?.previous || null,
    isLoading,
    error,
    mutate,
  };
};
