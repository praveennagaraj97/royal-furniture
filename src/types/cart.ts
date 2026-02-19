import type {
  BaseAPIResponse,
  ProductItem,
  ProductPricing,
  ResponsiveImages,
} from '@/types/response';

export interface CartItem {
  id: string; // product SKU or identifier
  cartItemId?: string; // server-side cart line id
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image: ResponsiveImages;
  price: number;
  basePrice?: number;
  quantity: number;
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

export interface CartState {
  cartId?: string;
  items: CartItem[];
  currency: string;
  frequentlyBought: ProductItem[];
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
  freeShippingMessage?: string;
  totals: CartTotals;
  header?: CartHeader;
}
