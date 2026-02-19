'use client';

import { cartService } from '@/services/api/cart-service';
import type { CartItem, CartState } from '@/types/cart';
import type { ProductItem } from '@/types/response';
import { getAuthToken } from '@/utils';
import { getOrCreateGuestSession } from '@/utils/guest-session';
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
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCouponAmount: (amount: number) => void;
  setDiscountAmount: (amount: number) => void;
  setShippingFee: (amount: number) => void;
  setFreeShippingThreshold: (amount: number) => void;
  guestSessionId?: string | null;
}

const STORAGE_KEY = 'rf-cart-state-v1';
const CART_CURRENCY = 'AED ';

// Default empty/dynamic cart state — no sample data
const DEFAULT_CART_STATE: CartState = {
  items: [],
  currency: CART_CURRENCY,
  shippingFee: 0,
  couponAmount: 0,
  discountAmount: 0,
  freeShippingThreshold: 0,
  frequentlyBought: [],
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(DEFAULT_CART_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartState;
        setState((prev) => ({ ...prev, ...parsed, currency: CART_CURRENCY }));
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

  // Ensure guest session ID is created/persisted for unauthenticated users
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const id = getOrCreateGuestSession();
      setGuestSessionId(id || null);
    } catch (err) {
      // ignore
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

  const addItem = useCallback(
    async (item: CartItem) => {
      // Optimistic local update
      setState((prev) => {
        const existing = prev.items.find((cartItem) => cartItem.id === item.id);
        const updatedItems = existing
          ? prev.items.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem,
            )
          : [...prev.items, item];

        const next = { ...prev, items: updatedItems };
        console.info('[Cart] addItem -> next.items', next.items);
        return next;
      });

      // Network sync. Use guest session for unauthenticated users.
      try {
        const token = getAuthToken();
        const sessionToUse = token
          ? undefined
          : guestSessionId || getOrCreateGuestSession();
        console.info('[Cart] sync addItem to server', {
          sku: item.id,
          qty: item.quantity,
          session: sessionToUse,
        });

        await cartService.addItem(
          { product_sku: item.id, quantity: item.quantity },
          sessionToUse,
        );

        console.info('[Cart] sync addItem success', item.id);
      } catch (err) {
        console.error('Failed to sync cart item with server', err);
        // Re-throw so callers awaiting addItem can handle error if desired
        throw err;
      }
    },
    [guestSessionId],
  );

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
      currency: CART_CURRENCY,
      totals,
      freeShippingThreshold: state.freeShippingThreshold,
      amountToFreeShipping,
      isHydrated,
      guestSessionId,
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
