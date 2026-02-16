export * from './cart';
export * from './error';
export * from './payload';
export * from './response';

// APP TYPES

export type CountryAndLocaleParam = { locale: string; country: string };

export interface CountryAndLocaleParams {
  params: Promise<CountryAndLocaleParam>;
}
