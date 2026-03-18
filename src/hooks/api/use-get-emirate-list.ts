'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { EmirateListResponse } from '@/types/response/address';
import useSWR from 'swr';

interface UseGetEmirateListProps {
  enabled?: boolean;
}

export const useGetEmirateList = ({
  enabled = true,
}: UseGetEmirateListProps = {}) => {
  const key = enabled ? API_ROUTES.USERS.EMIRATE_LIST : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<EmirateListResponse>(key, apiFetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    });

  return {
    data,
    emirates: data?.data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetEmirateList;
