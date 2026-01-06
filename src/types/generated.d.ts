declare module '@/generated/currency' {
  import { CountryLanguage } from '@/types/response';
  export const countries: readonly CountryLanguage[];
  export type Country = (typeof countries)[number];
}
