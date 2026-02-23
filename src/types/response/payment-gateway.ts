import type { BaseAPIResponse } from '@/types/response';

export type CheckoutType = 'normal';

export type PaymentMethod = 'tamara' | 'tabby';

export interface TamaraGatewayData {
  order_id: string;
  checkout_id: string;
  checkout_url: string;
  status: string;
}

export interface CheckoutOrderData {
  id: string;
  order_id: string;
  total_amount: number;
  is_flexi_payment: boolean;
  flexi_paid_amount: number | null;
  flexi_remain_amount: number | null;
  currency: string;
  payment_id: string;
  gateway_data: TamaraGatewayData | Record<string, unknown>;
}

export type CheckoutOrderResponse = BaseAPIResponse<CheckoutOrderData> & {
  version?: string;
  detail?: string;
  message?: string;
};
