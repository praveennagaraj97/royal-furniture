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
