'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { OrdersListResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetOrdersProps {
  page?: number;
}

export const useGetOrders = ({ page = 1 }: UseGetOrdersProps = {}) => {
  const params = new URLSearchParams();

  if (page && page > 1) {
    params.append('page', String(page));
  }

  const queryString = params.toString();
  const url = `${API_ROUTES.ORDERS.LIST}${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<OrdersListResponse>(
    url,
    apiFetcher<OrdersListResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: 0,
    },
  );

  const orders = data?.data?.results ?? [];
  const count = data?.data?.count ?? 0;
  const next = data?.data?.next ?? null;
  const previous = data?.data?.previous ?? null;

  return {
    orders,
    count,
    next,
    previous,
    isLoading,
    error,
    mutate,
  };
};
