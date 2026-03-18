import type { BaseAPIResponse } from '@/types/response';

export type AddressCategory = 'home' | 'office' | 'other';

export interface EmirateRegion {
  id: number;
  name: string;
}

export interface EmirateItem {
  id: number;
  name: string;
  regions: EmirateRegion[];
}

export type EmirateListResponse = BaseAPIResponse<EmirateItem[]> & {
  version?: string;
  meta?: {
    type: string;
    action: string;
  };
};

export interface UserAddress {
  id: number;
  created_at?: string;
  updated_at?: string;
  is_deleted?: boolean;
  name: string;
  email: string;
  phone: string;
  area?: string;
  street: string;
  building: string;
  town_or_city: string;
  emirate_id?: number;
  region_id?: number;
  notes?: string;
  is_default: boolean;
  category: AddressCategory;
  user?: number;
}

export interface AddressGroup {
  category: AddressCategory;
  addresses: UserAddress[];
}

export type AddressesListResponse = BaseAPIResponse<AddressGroup[]> & {
  version?: string;
  detail?: string;
  message?: string;
};

export type AddressResponse = BaseAPIResponse<UserAddress> & {
  version?: string;
  detail?: string;
  message?: string;
};

export interface AddressPayload {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  street?: string;
  building?: string;
  town_or_city?: string;
  emirate_id?: number;
  region_id?: number;
  notes?: string;
  is_default?: boolean;
  category?: AddressCategory;
}
