import type {
  BaseAPIResponse,
  ProductItem,
  ProductPricing,
  ResponsiveImages,
} from '@/types/response';
import { UserAddress } from './address';

export interface CartItem {
  id: string; // product SKU or identifier
  cartItemId: string; // server-side cart line id
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image: ResponsiveImages;
  price: number;
  basePrice?: number;
  quantity: number;
  stock?: number;
  attributes?: string[];
  totalPrice?: number;
  discountSavings?: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  coupon: number;
  shipping: number;
  total: number;
  itemsSavings: number;
}

export interface CartHeader {
  total_items?: number;
  current_step?: string;
}

export interface CartOrderSummary {
  item_price: string;
  discount_applied: string;
  coupon_applied: string | null;
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
  shipping_address: UserAddress | null;
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

export interface ShippingStepState {
  isGuest: boolean;
  step?: string;
  deliveryMethods: ('home' | 'pickup')[];
  shippingAddress?: unknown;
  defaultDeliveryDate?: string | null;
  deliverySlots: { id: number; timeRange: string }[];
  selectedDeliverySlot?: {
    date: string | null;
    slot: string | null;
    slotId: number | null;
  };
  customDeliveryCharge?: number | null;
}

export interface CartState {
  cartId?: string;
  items: CartItem[];
  frequentlyBought: ProductItem[];
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
  freeShippingMessage?: string;
  totals: CartTotals;
  header?: CartHeader;
  shippingStep?: ShippingStepState;
}
