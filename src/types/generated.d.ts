declare module '@/generated/currency' {
  import { CountryLanguage } from '@/types/response';
  export const currencies: readonly CountryLanguage[];
  export type Currency = (typeof currencies)[number];
}
