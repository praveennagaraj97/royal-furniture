'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { AddressesListResponse } from '@/types/response/address';
import useSWR from 'swr';

interface UseGetAddressesProps {
  enabled?: boolean;
}

export const useGetAddresses = ({
  enabled = true,
}: UseGetAddressesProps = {}) => {
  const key = enabled ? API_ROUTES.ADDRESSES.ROOT : null;

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<AddressesListResponse>(key, apiFetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    });

  return {
    data,
    addresses: data?.data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetAddresses;
