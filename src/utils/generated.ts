import { currencies } from '@/generated/currency';
import { CountryLanguage } from '@/types/response';

export const currenciesData = currencies || ([] as CountryLanguage[]);

export const getCurrenciesWithLocaleParams = (): readonly {
  locale: string;
  currency: string;
}[] => {
  return currenciesData.map((item) => ({
    locale: item.language_code,
    currency: item.currency.toLowerCase(),
  }));
};
