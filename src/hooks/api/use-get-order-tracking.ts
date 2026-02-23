'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { OrderTrackingResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetOrderTrackingProps {
  id?: string | null;
  enabled?: boolean;
}

export const useGetOrderTracking = ({
  id,
  enabled = true,
}: UseGetOrderTrackingProps) => {
  const url = enabled && id ? API_ROUTES.ORDERS.TRACKING(id) : null;

  const { data, error, isLoading, mutate } = useSWR<OrderTrackingResponse>(
    url,
    apiFetcher<OrderTrackingResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      dedupingInterval: 0,
    },
  );

  return {
    tracking: data?.data,
    isLoading,
    error,
    mutate,
  };
};
