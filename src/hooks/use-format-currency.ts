import { formatCurrency } from '@/utils/format-currency';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * React hook to format currency using params/locale from Next.js router if not provided
 * @returns (amount, countryCode?, locale?) => string
 */
export function useFormatCurrency() {
  const params = useParams();
  const locale = useLocale();
  // Try to get country from params (e.g., /[country]/...)
  const countryCode =
    typeof params?.country === 'string'
      ? params.country
      : Array.isArray(params?.country)
        ? params.country[0]
        : '';

  return useMemo(() => {
    return (amount: number | string, country?: string, loc?: string) => {
      return formatCurrency(amount, country || countryCode, loc || locale);
    };
  }, [countryCode, locale]);
}
