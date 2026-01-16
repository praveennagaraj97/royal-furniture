'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ProductListingResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetProductsProps {
  sub_category_id?: string | null;
  category_id?: string | null;
  q?: string;
  color?: string;
  price_min?: number | string;
  price_max?: number | string;
  sort?: string;
  size_id?: string;
  type_id?: string;
  filter_cpacity?: string;
  capacity?: string;
  filter_capacity?: string;
  enabled?: boolean;
}

export const useGetProducts = ({
  sub_category_id,
  category_id,
  q,
  color,
  price_min,
  price_max,
  sort,
  size_id,
  type_id,
  filter_cpacity,
  capacity,
  filter_capacity,
  enabled = true,
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
  if (color) {
    params.append('color', color);
  }
  if (price_min !== undefined && price_min !== null) {
    params.append('price_min', String(price_min));
  }
  if (price_max !== undefined && price_max !== null) {
    params.append('price_max', String(price_max));
  }
  if (sort) {
    params.append('sort', sort);
  }
  if (size_id) {
    params.append('size_id', size_id);
  }
  if (type_id) {
    params.append('type_id', type_id);
  }
  if (filter_cpacity) {
    params.append('filter_cpacity', filter_cpacity);
  }
  if (capacity) {
    params.append('capacity', capacity);
  }
  if (filter_capacity) {
    params.append('filter_capacity', filter_capacity);
  }

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
    }
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
