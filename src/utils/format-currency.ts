import { countries } from '@/generated/countries';

/**
 * Get currency details based on country code and locale
 */
export const getCurrencyDetails = (countryCode: string, locale: string) => {
  const country = countries.find(
    (c) => c.country_code === countryCode && c.language_code === locale
  );

  // Fallback to the first country entry matching code if exact locale match fails,
  // or just return the first entry/default if nothing found.
  const fallback =
    countries.find((c) => c.country_code === countryCode) || countries[0];

  return country || fallback;
};

/**
 * Format currency with localized symbol and number formatting
 * @param amount The price as number or string
 * @param countryCode The country code (e.g., 'ae', 'om')
 * @param locale The language locale (e.g., 'en', 'ar')
 * @returns The fully formatted currency string (e.g. "AED 1,234.50")
 */
export const formatCurrency = (
  amount: number | string,
  countryCode: string,
  locale: string
): string => {
  const config = getCurrencyDetails(countryCode, locale);
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(value)) {
    return `${config?.currency || ''} ${amount}`;
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formattedValue = formatter.format(value);
  const symbol = config?.currency || '';

  // Arabic usually places symbol after? Or implies space?
  if (locale === 'ar') {
    return `${formattedValue} ${symbol}`;
  }

  return `${symbol} ${formattedValue}`;
};
