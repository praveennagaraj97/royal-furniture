'use client';

import { apiFetcher } from '@/config/axios';
import { API_ROUTES } from '@/constants/api-routes';
import type { ProductDetailResponse } from '@/types/response';
import useSWR from 'swr';

interface UseGetProductDetailProps {
  productSlug?: string | null;
  enabled?: boolean;
}

export const useGetProductDetail = ({
  productSlug,
  enabled = true,
}: UseGetProductDetailProps) => {
  // Only call API using product slug — variant_id query param is not supported
  const key =
    enabled && productSlug
      ? `${API_ROUTES.PRODUCTS.DETAIL}${productSlug}`
      : null;

  const { data, error, isLoading, mutate } =
    useSWR<ProductDetailResponse | null>(
      key,
      apiFetcher<ProductDetailResponse>,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      },
    );

  const product = data?.data || null;

  const isVariantWishlisted = (id?: number | null) => {
    if (!product || !id) return false;

    // Traverse variants -> fabricsList -> colorsList to find matching variant_id
    for (const variantGroup of product.variants || []) {
      for (const fabric of variantGroup.fabricsList || []) {
        for (const color of fabric.colorsList || []) {
          if (color.variant_id === id) {
            return Boolean(color.is_wishlist);
          }
        }
      }
    }

    return false;
  };

  return {
    product,
    isLoading,
    error,
    mutate,
    isVariantWishlisted,
  };
};
