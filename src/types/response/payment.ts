import type { BaseAPIResponse } from '@/types/response';

export interface PromoCode {
  id: number;
  code: string;
  description: string;
  type: string;
  discount_type: string;
  discount_value: string;
  min_purchase: string;
  max_discount: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_global: boolean;
  remaining_uses: number | null;
  is_expired: boolean;
  user_used: boolean;
}

export type PromoCodesResponse = BaseAPIResponse<PromoCode[]> & {
  version?: string;
  detail?: string;
  message?: string;
};
