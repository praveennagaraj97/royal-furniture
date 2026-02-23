'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { OrdersListResponse } from '@/types/response';
import useSWRInfinite from 'swr/infinite';

export const useGetOrders = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: OrdersListResponse | null,
  ) => {
    if (previousPageData && !previousPageData.data?.next) {
      return null;
    }

    const page = pageIndex + 1;
    const params = new URLSearchParams();

    if (page > 1) {
      params.append('page', String(page));
    }

    const queryString = params.toString();
    return `${API_ROUTES.ORDERS.LIST}${queryString ? `?${queryString}` : ''}`;
  };

  const { data, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<OrdersListResponse>(getKey, apiFetcher<OrdersListResponse>, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: 0,
    });

  const pages = data ?? [];
  const orders = pages.flatMap((page) => page.data?.results ?? []);
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
    orders,
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
