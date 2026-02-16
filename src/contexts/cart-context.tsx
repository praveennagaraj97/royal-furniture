'use client';

import type { CartItem, CartState } from '@/types/cart';
import type { ProductItem } from '@/types/response';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

interface CartContextValue {
  items: CartItem[];
  frequentlyBought: ProductItem[];
  currency: string;
  totals: {
    subtotal: number;
    discount: number;
    coupon: number;
    shipping: number;
    total: number;
    itemsSavings: number;
  };
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  isHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCouponAmount: (amount: number) => void;
  setDiscountAmount: (amount: number) => void;
  setShippingFee: (amount: number) => void;
  setFreeShippingThreshold: (amount: number) => void;
}

const STORAGE_KEY = 'rf-cart-state-v1';

const SAMPLE_PRODUCT_IMAGE = {
  web: {
    url: 'https://images.unsplash.com/photo-1585559604903-1adc13f5d3d0?auto=format&fit=crop&w=800&q=80',
  },
  mobile: {
    url: 'https://images.unsplash.com/photo-1585559604903-1adc13f5d3d0?auto=format&fit=crop&w=600&q=80',
  },
};

const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    id: 'kids-bed-black-1',
    name: 'Kids Bed',
    slug: 'kids-bed',
    description: 'Save ฿200',
    color: 'Black',
    image: SAMPLE_PRODUCT_IMAGE,
    price: 799,
    basePrice: 1299,
    quantity: 1,
    attributes: ['Save ฿200', 'Colour: Black'],
  },
  {
    id: 'kids-bed-black-2',
    name: 'Kids Bed',
    slug: 'kids-bed',
    description: 'Save ฿200',
    color: 'Black',
    image: SAMPLE_PRODUCT_IMAGE,
    price: 799,
    basePrice: 1299,
    quantity: 1,
    attributes: ['Save ฿200', 'Colour: Black'],
  },
  {
    id: 'kids-bed-black-3',
    name: 'Kids Bed',
    slug: 'kids-bed',
    description: 'Save ฿200',
    color: 'Black',
    image: SAMPLE_PRODUCT_IMAGE,
    price: 799,
    basePrice: 1299,
    quantity: 1,
    attributes: ['Save ฿200', 'Colour: Black'],
  },
];

const SAMPLE_FREQUENTLY_BOUGHT: ProductItem[] = [1, 2, 3, 4].map((index) => ({
  id: index,
  name: 'Premium Sofa Set',
  slug: `premium-sofa-set-${index}`,
  description:
    'A plush sofa set with exquisite detailing and luxurious comfort for modern living spaces.',
  category: {
    id: 1,
    name: 'Living Room',
    slug: 'living-room',
  },
  sub_category: {
    id: 10 + index,
    name: 'Sofas',
    slug: 'sofas',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    responsive_images: SAMPLE_PRODUCT_IMAGE,
    category_name: 'Living Room',
    category_id: 1,
    category_slug: 'living-room',
  },
  pricing: {
    base_price: '1299',
    offer_price: '799',
    offer_percentage: '25',
    tax: '0',
  },
  thumbnail_image:
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
  responsive_images: SAMPLE_PRODUCT_IMAGE,
  label: [],
  is_offer: true,
  average_rating: 4.6,
  is_in_wishlist: false,
  available_colors: [],
}));

const DEFAULT_CART_STATE: CartState = {
  items: SAMPLE_CART_ITEMS,
  currency: '฿',
  shippingFee: 0,
  couponAmount: 15,
  discountAmount: 41,
  freeShippingThreshold: 2491,
  frequentlyBought: SAMPLE_FREQUENTLY_BOUGHT,
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(DEFAULT_CART_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartState;
        setState((prev) => ({ ...prev, ...parsed }));
      } else {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(DEFAULT_CART_STATE),
        );
      }
    } catch (error) {
      console.error('Failed to parse cart state from storage', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to persist cart state', error);
    }
  }, [state, isHydrated]);

  const addItem = useCallback((item: CartItem) => {
    setState((prev) => {
      const existing = prev.items.find((cartItem) => cartItem.id === item.id);
      const updatedItems = existing
        ? prev.items.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem,
          )
        : [...prev.items, item];

      return { ...prev, items: updatedItems };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, items: [] }));
  }, []);

  const setCouponAmount = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, couponAmount: Math.max(0, amount) }));
  }, []);

  const setDiscountAmount = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, discountAmount: Math.max(0, amount) }));
  }, []);

  const setShippingFee = useCallback((amount: number) => {
    setState((prev) => ({ ...prev, shippingFee: Math.max(0, amount) }));
  }, []);

  const setFreeShippingThreshold = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      freeShippingThreshold: Math.max(0, amount),
    }));
  }, []);

  const totals = useMemo(() => {
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const itemsSavings = state.items.reduce((sum, item) => {
      if (!item.basePrice || item.basePrice <= item.price) return sum;
      return sum + (item.basePrice - item.price) * item.quantity;
    }, 0);

    const discount = state.discountAmount;
    const coupon = state.couponAmount;
    const qualifiesForFreeShipping = subtotal >= state.freeShippingThreshold;
    const shipping = qualifiesForFreeShipping ? 0 : state.shippingFee;
    const total = subtotal - discount - coupon + shipping;

    return {
      subtotal,
      discount,
      coupon,
      shipping,
      total,
      itemsSavings,
    };
  }, [state]);

  const amountToFreeShipping = useMemo(() => {
    const remaining = state.freeShippingThreshold - totals.subtotal;
    return remaining > 0 ? remaining : 0;
  }, [state.freeShippingThreshold, totals.subtotal]);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      frequentlyBought: state.frequentlyBought,
      currency: state.currency,
      totals,
      freeShippingThreshold: state.freeShippingThreshold,
      amountToFreeShipping,
      isHydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCouponAmount,
      setDiscountAmount,
      setShippingFee,
      setFreeShippingThreshold,
    }),
    [
      state.items,
      state.frequentlyBought,
      state.currency,
      state.freeShippingThreshold,
      totals,
      amountToFreeShipping,
      isHydrated,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCouponAmount,
      setDiscountAmount,
      setShippingFee,
      setFreeShippingThreshold,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
