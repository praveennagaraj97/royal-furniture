'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { SearchResultsResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetSearchResultsProps {
  q?: string | null;
  query?: string | null;
  sort?: string;
  enabled?: boolean;
}

export const useGetSearchResults = ({
  q,
  query,
  sort,
  enabled = true,
}: UseGetSearchResultsProps) => {
  // Support both 'q' and 'query' parameters for backward compatibility
  const searchQuery = q || query || null;

  const params = new URLSearchParams();

  if (searchQuery) {
    params.append('q', searchQuery);
  }
  if (sort) {
    params.append('sort', sort);
  }

  const queryString = params.toString();
  const url =
    enabled && searchQuery
      ? `${API_ROUTES.PRODUCTS.SEARCH_RESULTS}?${queryString}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<SearchResultsResponse>(
    url,
    apiFetcher<SearchResultsResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const products = data?.data?.results || [];

  return {
    // Return both 'results' and 'products' for backward compatibility
    results: products,
    products: products,
    totalCount: data?.data?.total_count || 0,
    page: data?.data?.page || 1,
    totalPages: data?.data?.total_pages || 1,
    query: data?.data?.query || searchQuery || '',
    isLoading,
    error,
    mutate,
  };
};
