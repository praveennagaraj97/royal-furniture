'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ProductListingResponse } from '@/types/response';
import useSWRInfinite from 'swr/infinite';

export const useGetSavedItems = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: ProductListingResponse | null,
  ) => {
    if (previousPageData && !previousPageData.data?.next) {
      return null;
    }

    const page = pageIndex + 1;
    const params = new URLSearchParams();

    params.append('type', 'saved_items');

    if (page > 1) {
      params.append('page', String(page));
    }

    const queryString = params.toString();
    return `${API_ROUTES.PRODUCTS.VIEW_ALL}?${queryString}`;
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
  const count = pages[0]?.data?.count ?? 0;

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && !!data && !data[size - 1]);

  const lastPage = pages[pages.length - 1];
  const hasMore = Boolean(lastPage?.data?.next);

  const loadMore = () => {
    if (!hasMore) return;
    void setSize(size + 1);
  };

  return {
    products,
    count,
    isLoadingInitialData,
    isLoadingMore,
    hasMore,
    isValidating,
    error,
    mutate,
    loadMore,
  };
};
