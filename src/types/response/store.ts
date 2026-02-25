import type { BaseAPIResponse } from '@/types/response';

export interface StoreProductAvailability {
  product_id: number;
  product_name: string;
  product_slug: string;
  stock: number;
  is_available: boolean;
}

export interface StoreLocation {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  latitude: string;
  longitude: string;
  phone_number: string;
  products: StoreProductAvailability[];
}

export type StoresByCartResponse = BaseAPIResponse<StoreLocation[]> & {
  meta?: {
    type?: string;
    action?: string;
  };
  version?: string;
  detail?: string;
  message?: string;
};

export interface TryInStoreLocation {
  lat: number;
  long: number;
}

export interface TryInStoreAvailability {
  stock_count: number;
  is_out_of_stock: boolean;
}

export interface TryInStoreStore {
  store_id: number;
  name: string;
  address: string;
  city: string;
  distance_km: number;
  phone: string;
  location: TryInStoreLocation;
  availability: TryInStoreAvailability;
}

export interface TryInStoreStoreList {
  count: number;
  next: string | null;
  previous: string | null;
  results: TryInStoreStore[];
}

export type TryInStoreResponse = BaseAPIResponse<{
  store: TryInStoreStoreList;
}> & {
  meta?: {
    type?: string;
    action?: string;
  };
  version?: string;
  detail?: string;
  message?: string;
};
