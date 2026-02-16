import type { ProductItem, ResponsiveImages } from '@/types/response';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image: ResponsiveImages;
  price: number;
  basePrice?: number;
  quantity: number;
  attributes?: string[];
}

export interface CartState {
  items: CartItem[];
  currency: string;
  shippingFee: number;
  couponAmount: number;
  discountAmount: number;
  freeShippingThreshold: number;
  frequentlyBought: ProductItem[];
}
