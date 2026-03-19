'use client';

import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { useGetCartShippingStep } from '@/hooks/api';
import type {
  ShippingProceedApiData,
  ShippingSelection,
} from '@/types/response/cart';
import { buildIso, parseDateInput } from '@/utils/date';
import {
  createContext,
  FC,
  ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ShippingMethod = 'home' | 'pickup';

type SetShippingMethod = (
  method: ShippingMethod | ((prev: ShippingMethod) => ShippingMethod),
) => void;

type SetShippingSelection = (
  selection:
    | Partial<ShippingSelection>
    | ((prev: ShippingSelection) => Partial<ShippingSelection>),
) => void;

interface CheckoutShippingContextValue {
  shippingData?: ShippingProceedApiData;
  shippingMethod: ShippingMethod;
  shippingSelection: ShippingSelection;
  isShippingFetching: boolean;
  setShippingMethod: SetShippingMethod;
  setShippingSelection: SetShippingSelection;
  revalidateShipping: () => Promise<unknown>;
}

const DEFAULT_SHIPPING_SELECTION: ShippingSelection = {
  deliveryType: 'home',
  addressId: null,
  isCustomDelivery: false,
  date: null,
  slotId: null,
  slotLabel: null,
  storeId: null,
  pickupDate: null,
  pickupSlotId: null,
  pickupSlotLabel: null,
};

const CheckoutShippingContext =
  createContext<CheckoutShippingContextValue | null>(null);

const isShippingMethod = (value: string): value is ShippingMethod =>
  value === 'home' || value === 'pickup';

export const CheckoutShippingProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isHydrated, guestSessionId } = useCart();

  const [shippingMethod, setShippingMethodState] =
    useState<ShippingMethod>('home');
  const [shippingSelection, setShippingSelectionState] =
    useState<ShippingSelection>(DEFAULT_SHIPPING_SELECTION);

  const setShippingMethod = useCallback<SetShippingMethod>((method) => {
    setShippingMethodState((prev) =>
      typeof method === 'function' ? method(prev) : method,
    );
  }, []);

  const shouldFetchShipping = useMemo(
    () =>
      isHydrated &&
      !isAuthLoading &&
      (isAuthenticated || (!isAuthenticated && !!guestSessionId)),
    [isHydrated, isAuthLoading, isAuthenticated, guestSessionId],
  );

  const {
    shippingData,
    isLoading: isShippingLoading,
    isValidating: isShippingValidating,
    mutate: mutateShipping,
  } = useGetCartShippingStep({
    guestSessionId,
    enabled: shouldFetchShipping,
  });

  const setShippingSelection = useCallback<SetShippingSelection>(
    (selection) => {
      setShippingSelectionState((prev) => ({
        ...prev,
        ...(typeof selection === 'function' ? selection(prev) : selection),
      }));
    },
    [],
  );

  useEffect(() => {
    if (!shippingData) return;

    startTransition(() => {
      const selectedMethod = shippingData.selected_delivery_method;
      const availableMethods = (shippingData.delivery_method || []).filter(
        isShippingMethod,
      );
      const nextMethods: ShippingMethod[] = availableMethods.length
        ? availableMethods
        : ['home', 'pickup'];
      const fallbackMethod: ShippingMethod = nextMethods[0] ?? 'home';
      const resolvedMethod: ShippingMethod =
        selectedMethod && isShippingMethod(selectedMethod)
          ? selectedMethod
          : fallbackMethod;

      const slotLabel = shippingData.selected_delivery_slot?.slot ?? null;
      const parsedSelectedDate = parseDateInput(
        shippingData.selected_delivery_slot?.date,
      );

      const slotId =
        shippingData.selected_delivery_slot?.slot_id ??
        shippingData.delivery_slots.find((s) => s.time_range === slotLabel)
          ?.id ??
        null;

      if (shippingMethod !== resolvedMethod) {
        setShippingMethod(resolvedMethod);
      }

      setShippingSelection((prev) => {
        const deliveryType: ShippingMethod = nextMethods.includes(
          prev.deliveryType,
        )
          ? prev.deliveryType
          : resolvedMethod;

        return {
          addressId:
            shippingData.shipping_address?.id ?? prev.addressId ?? null,
          deliveryType,
          date: parsedSelectedDate ? buildIso(parsedSelectedDate) : null,
          slotId: slotId ?? null,
          slotLabel,
          isCustomDelivery: Boolean(parsedSelectedDate && slotId),
          storeId:
            selectedMethod === 'pickup'
              ? (shippingData.selected_store_id ?? prev.storeId ?? null)
              : null,
        };
      });
    });
  }, [shippingData, shippingMethod, setShippingMethod, setShippingSelection]);

  useEffect(() => {
    startTransition(() => {
      setShippingSelection((prev) =>
        shippingMethod === 'home'
          ? {
              ...prev,
              deliveryType: 'home',
              isCustomDelivery: false,
              storeId: null,
              pickupDate: null,
              pickupSlotId: null,
              pickupSlotLabel: null,
            }
          : {
              deliveryType: 'pickup',
              isCustomDelivery: false,
              date: null,
              slotId: null,
              slotLabel: null,
            },
      );
    });
  }, [shippingMethod, setShippingSelection]);

  const value = useMemo<CheckoutShippingContextValue>(
    () => ({
      shippingData,
      shippingMethod,
      shippingSelection,
      isShippingFetching: isShippingLoading || isShippingValidating,
      setShippingMethod,
      setShippingSelection,
      revalidateShipping: () => mutateShipping(),
    }),
    [
      shippingData,
      shippingMethod,
      shippingSelection,
      isShippingLoading,
      isShippingValidating,
      setShippingMethod,
      setShippingSelection,
      mutateShipping,
    ],
  );

  return (
    <CheckoutShippingContext.Provider value={value}>
      {children}
    </CheckoutShippingContext.Provider>
  );
};

export const useCheckoutShipping = (): CheckoutShippingContextValue => {
  const context = useContext(CheckoutShippingContext);

  if (!context) {
    throw new Error(
      'useCheckoutShipping must be used within CheckoutShippingProvider',
    );
  }

  return context;
};
