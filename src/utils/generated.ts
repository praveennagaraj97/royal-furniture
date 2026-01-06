import { countries } from '@/generated/countries';

export { countries };

export const SUPPORTED_COUNTRIES = Array.from(
  new Set(countries.map((item) => item.country_code))
);

export const DEFAULT_COUNTRY =
  countries.find((item) => item.is_default)?.country_code || 'ae';

export const DEFAULT_LOCALE =
  countries.find((item) => item.is_default)?.language_code || 'en';

export const LOCALES = Array.from(
  new Set(countries.map((item) => item.language_code))
);

export const getCurrenciesWithLocaleParams = (): readonly {
  locale: string;
  country: string;
}[] => {
  return countries.map((item) => ({
    locale: item.language_code,
    country: item.country_code,
  }));
};
