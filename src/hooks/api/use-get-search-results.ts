'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { SearchResultsResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetSearchResultsProps {
  query: string;
  limit?: number;
  page?: number;
  enabled?: boolean;
}

export const useGetSearchResults = ({
  query,
  limit = 10,
  page = 1,
  enabled = true,
}: UseGetSearchResultsProps) => {
  const url =
    enabled && query.trim()
      ? `${API_ROUTES.PRODUCTS.SEARCH_RESULTS}?q=${encodeURIComponent(
          query
        )}&limit=${limit}&page=${page}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<SearchResultsResponse>(
    url,
    apiFetcher<SearchResultsResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    results: data?.data?.results || [],
    totalCount: data?.data?.total_count || 0,
    page: data?.data?.page || 1,
    totalPages: data?.data?.total_pages || 0,
    query: data?.data?.query || '',
    isLoading,
    error,
    mutate,
  };
};
