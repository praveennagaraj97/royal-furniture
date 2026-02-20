'use client';

import { useGetCart, useGetCartShippingStep } from '@/hooks/api';
import { cartService } from '@/services/api/cart-service';
import type {
  CartApiData,
  CartApiItem,
  CartItem,
  CartState,
  CartTotals,
  ShippingProceedApiData,
} from '@/types/cart';
import type { ParsedAPIError } from '@/types/error';
import type { ProductItem } from '@/types/response';
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
import { useAuth } from './auth-context';
import { useToast } from './toast-context';

interface CartContextValue {
  cartId?: string;
  items: CartItem[];
  frequentlyBought: ProductItem[];
  totals: CartTotals;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  freeShippingProgress: number;
  freeShippingMessage?: string;
  isHydrated: boolean;
  isLoading: boolean;
  isShippingLoading: boolean;
  header?: CartState['header'];
  shippingStep?: CartState['shippingStep'];
  addItem: (sku: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  loadShippingStep: () => Promise<void>;
  pendingActions: Record<string, 'increase' | 'decrease' | 'remove'>;
  guestSessionId?: string | null;
}

const EMPTY_TOTALS: CartTotals = {
  subtotal: 0,
  discount: 0,
  coupon: 0,
  shipping: 0,
  total: 0,
  itemsSavings: 0,
};

const DEFAULT_CART_STATE: CartState = {
  cartId: undefined,
  items: [],
  frequentlyBought: [],
  freeShippingThreshold: 0,
  amountToFreeShipping: 0,
  freeShippingProgress: 0,
  totals: EMPTY_TOTALS,
  shippingStep: undefined,
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const normalizePrice = (value?: string | number | null): number => {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const mapCartItem = (item: CartApiItem): CartItem => {
  const { product } = item;

  const priceFromProduct = normalizePrice(product.pricing?.offer_price);
  const priceFromTotal = item.total_price
    ? normalizePrice(item.total_price) / Math.max(item.quantity || 1, 1)
    : 0;
  const unitPrice = priceFromProduct || priceFromTotal;

  const basePrice = normalizePrice(product.pricing?.base_price || undefined);
  const totalPrice = item.total_price
    ? normalizePrice(item.total_price)
    : unitPrice * item.quantity;
  const discountSavings = item.discount_savings
    ? normalizePrice(item.discount_savings)
    : undefined;

  const attributes: string[] = [];
  if (product.category?.name) attributes.push(product.category.name);
  if (product.sub_category?.name) attributes.push(product.sub_category.name);
  if (product.colour) attributes.push(product.colour);

  return {
    id: product.sku || String(product.id || item.id),
    cartItemId: item.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    color: product.colour,
    image: product.responsive_images || {},
    price: unitPrice,
    basePrice: basePrice || undefined,
    quantity: item.quantity,
    stock: product.stock_count,
    attributes,
    totalPrice,
    discountSavings,
  };
};

const mapCartDataToState = (data?: CartApiData): CartState => {
  if (!data) return { ...DEFAULT_CART_STATE };

  const items = (data.items || []).map(mapCartItem);

  const subtotal = normalizePrice(data.order_summary?.item_price);
  const discount = normalizePrice(data.order_summary?.discount_applied);
  const coupon = normalizePrice(
    data.order_summary?.coupon_applied || undefined,
  );

  const deliveryCharge = data.order_summary?.delivery_charge || '0';
  const shipping =
    typeof deliveryCharge === 'string' &&
    deliveryCharge.toLowerCase() === 'free'
      ? 0
      : normalizePrice(deliveryCharge);

  const total = normalizePrice(data.order_summary?.total_amount);
  const itemsSavings = (data.items || []).reduce((sum, item) => {
    const savings = normalizePrice(item.discount_savings || undefined);
    return sum + savings;
  }, 0);

  return {
    cartId: data.id,
    items,
    frequentlyBought: data.frequently_bought_together || [],
    freeShippingThreshold: data.free_shipping?.threshold || 0,
    amountToFreeShipping: data.free_shipping?.remaining_amount || 0,
    freeShippingProgress: Math.min(
      100,
      data.free_shipping?.progress_percentage || 0,
    ),
    freeShippingMessage: data.free_shipping?.message,
    totals: {
      subtotal,
      discount,
      coupon,
      shipping,
      total,
      itemsSavings,
    },
    header: data.header,
  };
};

const mapShippingProceedToState = (data?: ShippingProceedApiData) => {
  if (!data) return undefined;

  return {
    isGuest: data.is_guest,
    step: data.step,
    deliveryMethods: (data.delivery_method || []) as ('home' | 'pickup')[],
    shippingAddress: data.shipping_address || undefined,
    defaultDeliveryDate: data.default_delivery_date ?? null,
    deliverySlots: (data.delivery_slots || []).map((slot) => ({
      id: slot.id,
      timeRange: slot.time_range,
    })),
    selectedDeliverySlot: data.selected_delivery_slot
      ? {
          date: data.selected_delivery_slot.date,
          slot: data.selected_delivery_slot.slot,
          slotId: data.selected_delivery_slot.slot_id,
        }
      : undefined,
  } satisfies CartState['shippingStep'];
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(DEFAULT_CART_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [pendingActions, setPendingActions] = useState<
    Record<string, 'increase' | 'decrease' | 'remove'>
  >({});
  const { showSuccess, showError } = useToast();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const guestSessionForUse = !isAuthenticated
    ? guestSessionId || undefined
    : undefined;
  const canUseGuestSession = !isAuthenticated && !!guestSessionForUse;
  const shouldFetchCart =
    !isAuthLoading && (isAuthenticated || canUseGuestSession);

  const {
    data: cartResponse,
    isLoading: isCartLoading,
    mutate: mutateCart,
  } = useGetCart({
    guestSessionId: guestSessionForUse,
    enabled: shouldFetchCart,
  });

  const inShippingStep =
    state.header?.current_step === 'shipping' ||
    cartResponse?.data?.header?.current_step === 'shipping';

  const {
    data: shippingResponse,
    isLoading: isShippingFetching,
    mutate: mutateShipping,
  } = useGetCartShippingStep({
    guestSessionId: guestSessionForUse,
    enabled:
      !isAuthLoading &&
      inShippingStep &&
      (isAuthenticated || canUseGuestSession),
  });

  const getErrorMessage = useCallback(
    (error: unknown, fallback = 'Failed to process request') => {
      const parsed = error as ParsedAPIError;
      return parsed?.generalError || fallback;
    },
    [],
  );

  const setPendingAction = useCallback(
    (key: string, action?: 'increase' | 'decrease' | 'remove') => {
      setPendingActions((prev) => {
        const next = { ...prev };
        if (action) {
          next[key] = action;
        } else {
          delete next[key];
        }
        return next;
      });
    },
    [],
  );

  const resolveSession = useCallback(() => {
    if (isAuthenticated) return undefined;
    return guestSessionId || getOrCreateGuestSession();
  }, [guestSessionId, isAuthenticated]);

  const refreshCart = useCallback(async () => {
    if (!shouldFetchCart) return;
    setIsLoading(true);
    try {
      await mutateCart();
    } catch (error) {
      console.error('Failed to fetch cart from API', error);
      setState({ ...DEFAULT_CART_STATE });
      showError(getErrorMessage(error, 'Failed to load cart'));
    } finally {
      setIsHydrated(true);
      setIsLoading(false);
    }
  }, [mutateCart, getErrorMessage, showError, shouldFetchCart]);

  const loadShippingStep = useCallback(async () => {
    if (
      !inShippingStep ||
      isAuthLoading ||
      (!isAuthenticated && !guestSessionForUse)
    ) {
      return;
    }

    setIsShippingLoading(true);
    try {
      const response = await mutateShipping();
      const shippingStep = mapShippingProceedToState(response?.data);
      const mappedCart = mapCartDataToState(response?.data?.cart_summary);

      setState({
        ...mappedCart,
        shippingStep,
      });
    } catch (error) {
      showError(getErrorMessage(error, 'Failed to load shipping details'));
    } finally {
      setIsShippingLoading(false);
    }
  }, [
    mutateShipping,
    inShippingStep,
    isAuthLoading,
    isAuthenticated,
    guestSessionForUse,
    getErrorMessage,
    showError,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const id = getOrCreateGuestSession();
      setGuestSessionId(id || null);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  useEffect(() => {
    setIsLoading(isCartLoading);
  }, [isCartLoading]);

  useEffect(() => {
    if (cartResponse?.data) {
      setState((prev) => ({
        ...mapCartDataToState(cartResponse.data),
        shippingStep: prev.shippingStep,
      }));
      setIsHydrated(true);
    }
  }, [cartResponse]);

  useEffect(() => {
    if (shippingResponse?.data) {
      const shippingStep = mapShippingProceedToState(shippingResponse.data);
      const mappedCart = mapCartDataToState(shippingResponse.data.cart_summary);
      setState({
        ...mappedCart,
        shippingStep,
      });
    }
  }, [shippingResponse]);

  useEffect(() => {
    setIsShippingLoading(isShippingFetching);
  }, [isShippingFetching]);

  const addItem = useCallback(
    async (sku: string, quantity: number) => {
      try {
        const sessionToUse = resolveSession();
        await cartService.addItem({ product_sku: sku, quantity }, sessionToUse);
        await refreshCart();
      } catch (err) {
        console.error('Failed to sync cart item with server', err);
        showError(getErrorMessage(err, 'Failed to add to cart'));
        throw err;
      }
    },
    [refreshCart, resolveSession, getErrorMessage, showError],
  );

  const removeItem = useCallback(
    async (cartItemId: string) => {
      if (!state.cartId) {
        console.warn('[Cart] Cannot remove item without cart id');
        return;
      }

      const sessionToUse = resolveSession();
      setPendingAction(cartItemId, 'remove');

      try {
        await cartService.removeItem(cartItemId, sessionToUse);
        showSuccess('Removed from cart');
        await refreshCart();
      } catch (err) {
        console.error('Failed to remove cart item', err);
        showError(getErrorMessage(err, 'Failed to remove item'));
      } finally {
        setPendingAction(cartItemId);
      }
    },
    [
      state.cartId,
      resolveSession,
      refreshCart,
      setPendingAction,
      showSuccess,
      showError,
      getErrorMessage,
    ],
  );

  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      if (quantity < 1) {
        return removeItem(cartItemId);
      }

      const item = state.items.find(
        (entry) => (entry.cartItemId || entry.id) === cartItemId,
      );
      if (!item) {
        console.warn('[Cart] Item not found for update', { cartItemId });
        return;
      }

      if (!state.cartId) {
        console.warn('[Cart] Cannot update quantity without cart id');
        return;
      }

      const action: 'increase' | 'decrease' =
        quantity > item.quantity ? 'increase' : 'decrease';

      if (quantity === item.quantity) return;

      const sessionToUse = resolveSession();
      setPendingAction(cartItemId, action);

      try {
        await cartService.updateItemQuantity(cartItemId, action, sessionToUse);
        await refreshCart();
      } catch (err) {
        console.error('Failed to update cart quantity', err);
        showError(getErrorMessage(err, 'Failed to update quantity'));
      } finally {
        setPendingAction(cartItemId);
      }
    },
    [
      state.items,
      state.cartId,
      resolveSession,
      refreshCart,
      setPendingAction,
      removeItem,
      showError,
      getErrorMessage,
    ],
  );

  const clearCart = useCallback(() => {
    console.info('[Cart] clearCart not wired yet');
    // TODO: implement clear cart API once available
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cartId: state.cartId,
      items: state.items,
      frequentlyBought: state.frequentlyBought,
      totals: state.totals,
      freeShippingThreshold: state.freeShippingThreshold,
      amountToFreeShipping: state.amountToFreeShipping,
      freeShippingProgress: state.freeShippingProgress,
      freeShippingMessage: state.freeShippingMessage,
      isHydrated,
      isLoading,
      isShippingLoading,
      header: state.header,
      shippingStep: state.shippingStep,
      guestSessionId,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart,
      loadShippingStep,
      pendingActions,
    }),
    [
      state.cartId,
      state.items,
      state.frequentlyBought,
      state.freeShippingThreshold,
      state.amountToFreeShipping,
      state.freeShippingProgress,
      state.freeShippingMessage,
      state.totals,
      state.header,
      state.shippingStep,
      isHydrated,
      isLoading,
      isShippingLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart,
      loadShippingStep,
      pendingActions,
      guestSessionId,
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
