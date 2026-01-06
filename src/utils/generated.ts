import { currencies } from '@/generated/currency';
import { CountryLanguage } from '@/types/response';

export const currenciesData = currencies || ([] as CountryLanguage[]);

export const getCurrenciesWithLocaleParams = (): readonly {
  locale: string;
  country_code: string;
}[] => {
  return currenciesData.map((item) => ({
    locale: item.language_code,
    country_code: item.country_code.toLowerCase(),
  }));
};
