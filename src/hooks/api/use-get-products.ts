'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ProductListingResponse } from '@/types/response';
import useSWRInfinite from 'swr/infinite';

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
  const shouldFetch = enabled && Boolean(sub_category_id || category_id || q);

  const getKey = (
    pageIndex: number,
    previousPageData: ProductListingResponse | null,
  ) => {
    if (!shouldFetch) {
      return null;
    }

    if (previousPageData && !previousPageData.data?.next) {
      return null;
    }

    const page = pageIndex + 1;
    const pageParams = new URLSearchParams(queryString);

    if (page > 1) {
      pageParams.set('page', String(page));
    } else {
      pageParams.delete('page');
    }

    const pageQuery = pageParams.toString();
    const baseUrl = API_ROUTES.PRODUCTS.LISTING;

    return `${baseUrl}${pageQuery ? `?${pageQuery}` : ''}`;
  };

  const { data, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<ProductListingResponse>(
      getKey,
      apiFetcher<ProductListingResponse>,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
        dedupingInterval: 0,
      },
    );

  const pages = data ?? [];
  const products = pages.flatMap((page) => page.data?.results ?? []);
  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  const count = firstPage?.data?.count ?? 0;
  const next = lastPage?.data?.next ?? null;
  const previous = firstPage?.data?.previous ?? null;

  const isLoadingInitialData = shouldFetch ? !data && !error : false;
  const isLoadingMore =
    shouldFetch &&
    (isLoadingInitialData || (size > 0 && !!data && !data[size - 1]));

  const hasMore = shouldFetch ? Boolean(lastPage?.data?.next) : false;

  const loadMore = () => {
    if (!hasMore) return;
    void setSize(size + 1);
  };

  return {
    products,
    count,
    next,
    previous,
    hasMore,
    loadMore,
    isLoadingInitialData,
    isLoadingMore,
    isValidating,
    error,
    mutate,
  };
};
