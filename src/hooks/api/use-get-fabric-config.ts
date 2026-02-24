'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { FabricConfigData, FabricConfigResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetFabricConfigProps {
  productSlug?: string | null;
  enabled?: boolean;
}

export const useGetFabricConfig = ({
  productSlug,
  enabled = true,
}: UseGetFabricConfigProps) => {
  const key =
    enabled && productSlug
      ? API_ROUTES.PRODUCTS.FABRIC_CONFIG(productSlug)
      : null;

  const { data, error, isLoading, mutate } =
    useSWR<FabricConfigResponse | null>(key, apiFetcher<FabricConfigResponse>, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  const config: FabricConfigData | null = data?.data || null;

  return {
    config,
    fabrics: config?.fabrics ?? [],
    isLoading,
    error,
    mutate,
  };
};
