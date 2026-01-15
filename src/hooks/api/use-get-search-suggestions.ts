'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { SearchSuggestionsResponse } from '@/types/response';
import useSWR from 'swr';

export const useGetSearchSuggestions = () => {
  const { data, error, isLoading, mutate } = useSWR<SearchSuggestionsResponse>(
    API_ROUTES.PRODUCTS.SEARCH_SUGGESTIONS,
    apiFetcher<SearchSuggestionsResponse>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data?.data,
    popularSearches: data?.data?.popular_searches || [],
    mostSearchedProducts: data?.data?.most_searched_products?.items || [],
    trendingCategories: data?.data?.trending_categories?.items || [],
    isLoading,
    error,
    mutate,
  };
};
