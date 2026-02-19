'use client';

import { apiFetcher } from '@/config/axios';
import type { ReviewsData, ReviewsResponse } from '@/types/response';
import useSWR, { type KeyedMutator } from 'swr';

interface UseGetReviewsProps {
  productSlug?: string | null;
  enabled?: boolean;
}

export const useGetReviews = ({
  productSlug,
  enabled = true,
}: UseGetReviewsProps): {
  data: ReviewsData | null;
  isLoading: boolean;
  error: unknown;
  mutate: KeyedMutator<ReviewsResponse | null>;
} => {
  const key =
    enabled && productSlug
      ? `/review/review/?product_slug=${productSlug}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<ReviewsResponse | null>(
    key,
    apiFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data: data?.data ?? null,
    isLoading,
    error,
    mutate,
  };
};

export default useGetReviews;
