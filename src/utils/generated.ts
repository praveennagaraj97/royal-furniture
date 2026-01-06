import { currencies } from '@/generated/currency';
import { CountryLanguage } from '@/types/response';

export const currenciesData = currencies || ([] as CountryLanguage[]);

export const SUPPORTED_COUNTRIES = Array.from(
  new Set(currenciesData.map((item) => item.country_code.toLowerCase()))
);

export const DEFAULT_COUNTRY =
  currenciesData.find((item) => item.is_default)?.country_code.toLowerCase() ||
  'ae';

export const getCurrenciesWithLocaleParams = (): readonly {
  locale: string;
  country: string;
}[] => {
  return currenciesData.map((item) => ({
    locale: item.language_code,
    country: item.country_code,
  }));
};
