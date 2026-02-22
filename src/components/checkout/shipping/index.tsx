'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { useGetCartShippingStep } from '@/hooks/api';
import type {
  ShippingProceedApiData,
  ShippingSelection,
  ShippingStepState,
} from '@/types/response/cart';
import { buildIso, parseDateInput } from '@/utils/date';
import {
  FC,
  Fragment,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { DeliveryInfoCard } from '../common/info-sections/delivery-card';
import { OrderSummarySection } from '../common/order-summary';
import DeliveryOptionsSection from './delivery-options';
import PickupOptionsSection from './pickup-options';
import PickupStoresSection from './pickup-stores-section';
import { ShippingAddressSection } from './shipping-address-section';
import { ShippingMethodSection } from './shipping-method-section';

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
    customDeliveryCharge:
      data.custom_delivery_charge === undefined ||
      data.custom_delivery_charge === null
        ? null
        : Number.isFinite(Number(data.custom_delivery_charge))
          ? Number(data.custom_delivery_charge)
          : null,
    selectedDeliverySlot: data.selected_delivery_slot
      ? {
          date: data.selected_delivery_slot.date,
          slot: data.selected_delivery_slot.slot,
          slotId: data.selected_delivery_slot.slot_id,
        }
      : undefined,
  } satisfies ShippingStepState;
};

const ShippingPageContent: FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const {
    isHydrated,
    cartId,
    guestSessionId,
    shipping,
    setShippingStep,
    setShippingMethod,
    setShippingSelection,
  } = useCart();

  const {
    step: shippingStep,
    method: shippingMethod,
    selection: shippingSelection,
  } = shipping;

  const shouldFetchShipping = useMemo(
    () =>
      isHydrated &&
      !isAuthLoading &&
      (isAuthenticated || (!isAuthenticated && !!guestSessionId)),
    [isHydrated, isAuthLoading, isAuthenticated, guestSessionId],
  );

  const {
    data: shippingResponse,
    isLoading: isShippingLoading,
    isValidating: isShippingValidating,
    mutate: mutateShipping,
  } = useGetCartShippingStep({
    guestSessionId,
    enabled: shouldFetchShipping,
  });

  const isShippingFetching = isShippingLoading || isShippingValidating;

  const handleShippingSelectionUpdate = useCallback(
    (update: Partial<ShippingSelection>) => {
      setShippingSelection(update);
    },
    [setShippingSelection],
  );

  useEffect(() => {
    startTransition(() => {
      const shippingData = shippingResponse?.data;
      if (!shippingData) return;

      const mappedStep = mapShippingProceedToState(shippingData);
      setShippingStep(mappedStep);

      const slotLabel = shippingData.selected_delivery_slot?.slot ?? null;
      const parsedSelectedDate = parseDateInput(
        shippingData.selected_delivery_slot?.date,
      );
      const slotId =
        shippingData.selected_delivery_slot?.slot_id ??
        mappedStep?.deliverySlots.find((slot) => slot.timeRange === slotLabel)
          ?.id ??
        null;

      const availableMethods = mappedStep?.deliveryMethods || [
        'home',
        'pickup',
      ];
      setShippingMethod((prev) =>
        availableMethods.includes(prev) ? prev : availableMethods[0] || 'home',
      );

      setShippingSelection((prev) => ({
        ...prev,
        deliveryType: availableMethods.includes(prev.deliveryType)
          ? prev.deliveryType
          : availableMethods[0] || 'home',
        date: parsedSelectedDate ? buildIso(parsedSelectedDate) : null,
        slotId: slotId ?? null,
        slotLabel,
        isCustomDelivery: Boolean(parsedSelectedDate && slotId),
        pickupDate: prev.pickupDate,
        pickupSlotId: prev.pickupSlotId,
        pickupSlotLabel: prev.pickupSlotLabel,
      }));
    });
  }, [
    shippingResponse,
    setShippingStep,
    setShippingMethod,
    setShippingSelection,
  ]);

  useEffect(() => {
    startTransition(() => {
      setShippingSelection((prev) => {
        if (shippingMethod === 'home') {
          return {
            ...prev,
            deliveryType: 'home',
            isCustomDelivery: false,
            storeId: null,
            pickupDate: null,
            pickupSlotId: null,
            pickupSlotLabel: null,
          };
        }

        return {
          ...prev,
          deliveryType: 'pickup',
          isCustomDelivery: false,
          date: null,
          slotId: null,
          slotLabel: null,
        };
      });
    });
  }, [shippingMethod, setShippingSelection]);

  if (!isHydrated) {
    return null;
  }

  return (
    <Fragment>
      <div className="section-container">
        <StaggerContainer className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)]">
          {/* Left column: shipping method + address */}
          <div className="space-y-6">
            <StaggerItem type="slideUp" distance={30}>
              <ShippingMethodSection
                shippingStep={shippingStep}
                isShippingLoading={isShippingFetching}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
              />
            </StaggerItem>
            <StaggerItem type="slideUp" distance={30}>
              {shippingMethod === 'pickup' ? (
                <PickupStoresSection
                  cartId={cartId}
                  guestSessionId={guestSessionId}
                  shippingMethod={shippingMethod}
                  shippingSelection={shippingSelection}
                  setShippingSelection={handleShippingSelectionUpdate}
                />
              ) : (
                <ShippingAddressSection
                  shippingAddress={shippingStep?.shippingAddress ?? null}
                  onShippingRevalidate={async () => {
                    await mutateShipping();
                  }}
                />
              )}
            </StaggerItem>
          </div>

          {/* Right column: full sticky area (desktop) with inner animated sections */}
          <div className="space-y-6 lg:self-start z-30 lg:sticky lg:top-28">
            <StaggerItem type="slideUp" distance={30}>
              <OrderSummarySection step="shipping" showPaymentPlans={false} />
            </StaggerItem>

            {shippingMethod === 'home' ? (
              <>
                <DeliveryInfoCard />
                <DeliveryOptionsSection
                  shippingStep={shippingStep}
                  isShippingLoading={isShippingFetching}
                  shippingSelection={shippingSelection}
                  setShippingSelection={handleShippingSelectionUpdate}
                />
              </>
            ) : (
              <>
                <PickupOptionsSection
                  shippingStep={shippingStep}
                  isShippingLoading={isShippingFetching}
                  shippingSelection={shippingSelection}
                  setShippingSelection={handleShippingSelectionUpdate}
                />
              </>
            )}
          </div>
        </StaggerContainer>
      </div>
    </Fragment>
  );
};

export default ShippingPageContent;
