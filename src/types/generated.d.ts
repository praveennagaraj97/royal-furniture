declare module '@/generated/currency' {
  import { CountryLanguage } from '@/types';
  export const countries: readonly CountryLanguage[];
  export type Country = (typeof countries)[number];
}
