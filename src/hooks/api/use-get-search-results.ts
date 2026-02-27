'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { SearchResultsResponse } from '@/types/response';
import useSWRInfinite from 'swr/infinite';

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
  const shouldFetch = enabled && Boolean(searchQuery);

  const getKey = (
    pageIndex: number,
    previousPageData: SearchResultsResponse | null,
  ) => {
    if (!shouldFetch) {
      return null;
    }

    if (previousPageData) {
      const prevPage = previousPageData.data?.page ?? pageIndex;
      const totalPages = previousPageData.data?.total_pages ?? prevPage;

      if (prevPage >= totalPages) {
        return null;
      }
    }

    const page = pageIndex + 1;
    const pageParams = new URLSearchParams(queryString);
    pageParams.set('page', String(page));

    return `${API_ROUTES.PRODUCTS.SEARCH_RESULTS}?${pageParams.toString()}`;
  };

  const { data, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<SearchResultsResponse>(
      getKey,
      apiFetcher<SearchResultsResponse>,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      },
    );

  const pages = data ?? [];
  const products = pages.flatMap((page) => page.data?.results ?? []);
  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  const totalCount = firstPage?.data?.total_count ?? 0;
  const totalPages = firstPage?.data?.total_pages ?? 0;
  const queryValue = firstPage?.data?.query ?? searchQuery ?? '';
  const currentPage = lastPage?.data?.page ?? (pages.length ? pages.length : 1);

  const isLoadingInitialData = shouldFetch ? !data && !error : false;
  const isLoadingMore =
    shouldFetch &&
    (isLoadingInitialData || (size > 0 && !!data && !data[size - 1]));

  const hasMore =
    shouldFetch && totalPages > 0 ? currentPage < totalPages : false;

  const loadMore = () => {
    if (!hasMore) return;
    void setSize(size + 1);
  };

  const isLoading = isLoadingInitialData;

  return {
    results: products,
    products,
    totalCount,
    page: currentPage,
    totalPages,
    query: queryValue,
    hasMore,
    loadMore,
    isLoading,
    isLoadingInitialData,
    isLoadingMore,
    isValidating,
    error,
    mutate,
  };
};
