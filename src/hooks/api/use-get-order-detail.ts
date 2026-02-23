'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { OrderDetailResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetOrderDetailProps {
  id?: string | null;
  enabled?: boolean;
}

export const useGetOrderDetail = ({
  id,
  enabled = true,
}: UseGetOrderDetailProps) => {
  const url = enabled && id ? API_ROUTES.ORDERS.DETAIL(id) : null;

  const { data, error, isLoading, mutate } = useSWR<OrderDetailResponse>(
    url,
    apiFetcher<OrderDetailResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: 0,
    },
  );

  return {
    order: data?.data,
    isLoading,
    error,
    mutate,
  };
};
