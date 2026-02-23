'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { OrderDeliverySlotsResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetOrderDeliverySlotsProps {
  enabled?: boolean;
}

export const useGetOrderDeliverySlots = ({
  enabled = true,
}: UseGetOrderDeliverySlotsProps = {}) => {
  const url = enabled ? API_ROUTES.ORDERS.DELIVERY_SLOTS : null;

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<OrderDeliverySlotsResponse>(
      url,
      apiFetcher<OrderDeliverySlotsResponse>,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
        dedupingInterval: 0,
      },
    );

  return {
    slots: data?.data.slots ?? [],
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
