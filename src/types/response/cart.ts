import type {
  BaseAPIResponse,
  ProductItem,
  ProductPricing,
  ResponsiveImages,
} from '@/types/response';
import type { AddressPayload, UserAddress } from './address';

export interface CartItem {
  id: string; // product SKU or identifier
  cartItemId: string; // server-side cart line id
  name: string;
  slug: string;
  categorySlug?: string;
  subcategorySlug?: string;
  description?: string;
  color?: string;
  image: ResponsiveImages;
  price: number;
  basePrice?: number;
  quantity: number;
  stock?: number;
  viewCount?: number;
  attributes?: string[];
  totalPrice?: number;
  discountSavings?: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  coupon: number;
  couponCode?: string | null;
  shipping: number;
  total: number;
  itemsSavings: number;
}

export interface CartHeader {
  total_items?: number;
  current_step?: string;
}

export interface CartAppliedCoupon {
  id: number;
  code: string;
  description: string;
  type: string;
  discount_type: string;
  discount_value: string;
  min_purchase: string;
  max_discount: string;
}

export interface CartOrderSummary {
  item_price: string;
  discount_applied: string;
  coupon_applied: CartAppliedCoupon | null;
  delivery_charge: string;
  total_amount: string;
}

export interface CartFreeShipping {
  threshold: number;
  remaining_amount: number;
  progress_percentage: number;
  message?: string;
}

export interface CartApiItem {
  id: string;
  product: ProductItem & {
    sku?: string;
    colour?: string;
    pricing?: ProductPricing;
    responsive_images?: ResponsiveImages;
    stock_count?: number;
    view_count?: number;
  };
  quantity: number;
  discount_savings?: string;
  total_price?: string;
}

export interface CartApiData {
  id: string;
  header?: CartHeader;
  free_shipping?: CartFreeShipping;
  items: CartApiItem[];
  order_summary?: CartOrderSummary;
  frequently_bought_together: ProductItem[];
  saved_for_later_items?: ProductItem[];
  flexi_pay_option: {
    available: boolean;
    first_payment: string;
    is_selected: boolean;
    percentage: number;
    remaining_payment: string;
  };
}

export type CartApiResponse = BaseAPIResponse<CartApiData> & {
  version?: string;
  meta?: unknown;
};

export interface ShippingDeliverySlot {
  id: number;
  time_range: string;
}

export interface ShippingSelectedSlot {
  date: string | null;
  slot: string | null;
  slot_id: number | null;
}

export interface ShippingProceedApiData {
  is_guest: boolean;
  step: string;
  delivery_method: string[];
  selected_delivery_method?: string | null;
  is_custom_delivery?: boolean;
  shipping_address: UserAddress | null;
  guest_user_address?: UserAddress | null;
  selected_store_id?: number | null;
  default_delivery_date?: string | null;
  delivery_slots: ShippingDeliverySlot[];
  cart_summary: CartApiData;
  selected_delivery_slot?: ShippingSelectedSlot | null;
  custom_delivery_charge?: string | number | null;
}

export type ShippingProceedResponse =
  BaseAPIResponse<ShippingProceedApiData> & {
    version?: string;
    detail?: string;
    message?: string;
  };

export interface PaymentOption {
  method: string;
  display_name: string;
  category: string;
  icon_url: string;
  sort_order: number;
}

export interface PaymentProceedApiData {
  cart_step: string;
  payments: {
    wallets: PaymentOption[];
    saved_cards: PaymentOption[];
    other_payment_options: PaymentOption[];
  };
  address: UserAddress;
  order_summary: CartOrderSummary;
}

export type PaymentProceedResponse = BaseAPIResponse<PaymentProceedApiData> & {
  version?: string;
  detail?: string;
  message?: string;
};

export type ShippingSelection = {
  deliveryType: 'home' | 'pickup';
  addressId?: number | null;
  isCustomDelivery: boolean;
  date: string | null;
  slotId: number | null;
  slotLabel: string | null;
  storeId: number | null;
  pickupDate: string | null;
  pickupSlotId: number | null;
  pickupSlotLabel: string | null;
};

export interface ProceedToPaymentPayload extends Partial<AddressPayload> {
  delivery_type: 'home' | 'pickup';
  address_id?: number | null;
  is_custom_delivery?: boolean;
  date?: string | null;
  slot_id?: number | null;
  store_id?: number | null;
}

export interface CartState {
  cartId?: string;
  items: CartItem[];
  frequentlyBought: ProductItem[];
  savedForLater: ProductItem[];
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
  freeShippingMessage?: string;
  totals: CartTotals;
  header?: CartHeader;
}
