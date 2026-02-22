'use client';

import { useGetCart } from '@/hooks/api';
import { cartService } from '@/services/api/cart-service';
import type { ParsedAPIError } from '@/types/error';
import type { ProductItem } from '@/types/response';
import type {
  CartApiData,
  CartApiItem,
  CartItem,
  CartShippingState,
  CartState,
  CartTotals,
  ShippingSelection,
  ShippingStepState,
} from '@/types/response/cart';
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
  header?: CartState['header'];
  shipping: CartShippingState;
  setShippingStep: (
    step?:
      | ShippingStepState
      | ((prev?: ShippingStepState) => ShippingStepState | undefined),
  ) => void;
  setShippingMethod: (
    method:
      | 'home'
      | 'pickup'
      | ((prev: 'home' | 'pickup') => 'home' | 'pickup'),
  ) => void;
  setShippingSelection: (
    selection:
      | Partial<ShippingSelection>
      | ((prev: ShippingSelection) => Partial<ShippingSelection>),
  ) => void;
  addItem: (sku: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  pendingActions: Record<string, 'increase' | 'decrease' | 'remove'>;
  guestSessionId?: string | null;
}

const EMPTY_TOTALS: CartTotals = {
  subtotal: 0,
  discount: 0,
  coupon: 0,
  couponCode: null,
  shipping: 0,
  total: 0,
  itemsSavings: 0,
};

const DEFAULT_SHIPPING_SELECTION: ShippingSelection = {
  deliveryType: 'home',
  isCustomDelivery: false,
  date: null,
  slotId: null,
  slotLabel: null,
  storeId: null,
  pickupDate: null,
  pickupSlotId: null,
  pickupSlotLabel: null,
};

const DEFAULT_CART_STATE: CartState = {
  cartId: undefined,
  items: [],
  frequentlyBought: [],
  freeShippingThreshold: 0,
  amountToFreeShipping: 0,
  freeShippingProgress: 0,
  totals: EMPTY_TOTALS,
  shipping: {
    method: 'home',
    selection: DEFAULT_SHIPPING_SELECTION,
  },
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
    basePrice: basePrice || undefined,
    price: unitPrice,
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

  const appliedCoupon = data.order_summary?.coupon_applied || null;
  const coupon = appliedCoupon
    ? normalizePrice(appliedCoupon.discount_value)
    : 0;
  const couponCode = appliedCoupon?.code || null;

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
      couponCode,
      shipping,
      total,
      itemsSavings,
    },
    header: data.header,
    shipping: DEFAULT_CART_STATE.shipping,
  };
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(DEFAULT_CART_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    // Only show the full-page loading state while hydrating the cart initially.
    const shouldShowFullLoader = !isHydrated;
    if (shouldShowFullLoader) {
      setIsLoading(true);
    }

    try {
      await mutateCart();
    } catch (error) {
      console.error('Failed to fetch cart from API', error);
      setState({ ...DEFAULT_CART_STATE });
      showError(getErrorMessage(error, 'Failed to load cart'));
    } finally {
      setIsHydrated(true);
      if (shouldShowFullLoader) {
        setIsLoading(false);
      }
    }
  }, [mutateCart, getErrorMessage, showError, shouldFetchCart, isHydrated]);

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
    if (!isHydrated) {
      setIsLoading((prev) => prev || isCartLoading);
      return;
    }

    // After hydration, keep the page content visible and rely on inline spinners.
    if (!isCartLoading && isLoading) {
      setIsLoading(false);
    }
  }, [isCartLoading, isHydrated, isLoading]);

  useEffect(() => {
    if (cartResponse?.data) {
      setState((prev) => ({
        ...mapCartDataToState(cartResponse.data),
        shipping: prev.shipping,
      }));
      setIsHydrated(true);
    }
  }, [cartResponse]);

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

  const setShippingStep = useCallback(
    (
      step?:
        | ShippingStepState
        | ((prev?: ShippingStepState) => ShippingStepState | undefined),
    ) => {
      setState((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          step: typeof step === 'function' ? step(prev.shipping.step) : step,
        },
      }));
    },
    [],
  );

  const setShippingMethod = useCallback(
    (
      method:
        | 'home'
        | 'pickup'
        | ((prev: 'home' | 'pickup') => 'home' | 'pickup'),
    ) => {
      setState((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          method:
            typeof method === 'function'
              ? method(prev.shipping.method)
              : method,
        },
      }));
    },
    [],
  );

  const setShippingSelection = useCallback(
    (
      selection:
        | Partial<ShippingSelection>
        | ((prev: ShippingSelection) => Partial<ShippingSelection>),
    ) => {
      setState((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          selection: {
            ...prev.shipping.selection,
            ...(typeof selection === 'function'
              ? selection(prev.shipping.selection)
              : selection),
          },
        },
      }));
    },
    [],
  );

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
      header: state.header,
      shipping: state.shipping,
      setShippingStep,
      setShippingMethod,
      setShippingSelection,
      guestSessionId,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart,
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
      state.shipping,
      isHydrated,
      isLoading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart,
      pendingActions,
      guestSessionId,
      setShippingStep,
      setShippingMethod,
      setShippingSelection,
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
