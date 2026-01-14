'use client';

import { useParams as useNextParams } from 'next/navigation';

/**
 * Typed params interface for the app's route structure
 */
export interface AppParams {
  country?: string;
  locale?: string;
  category?: string;
  subcategory?: string;
  product?: string;
}

/**
 * Custom hook similar to useParams but with typed return values
 * for the app's route structure (country, locale, category, subcategory, product)
 *
 * @returns Typed params object with all possible route segments
 *
 * @example
 * ```tsx
 * const { country, locale, category, subcategory, product } = useAppParams();
 * ```
 */
export function useAppParams(): AppParams {
  const params = useNextParams();

  return {
    country: params?.country as string | undefined,
    locale: params?.locale as string | undefined,
    category: params?.category as string | undefined,
    subcategory: params?.subcategory as string | undefined,
    product: params?.product as string | undefined,
  };
}
