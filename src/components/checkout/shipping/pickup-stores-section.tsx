'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import PickupStoresSkeleton from '@/components/skeletons/pickup-stores-skeleton';
import { useCart } from '@/contexts/cart-context';
import { useCheckoutShipping } from '@/contexts/shipping-context';
import { useGetStoresByCart } from '@/hooks/api';
import type { StoreLocation } from '@/types/response/store';
import { useTranslations } from 'next-intl';
import { FC, startTransition, useEffect, useState } from 'react';
import { FiInbox, FiMapPin, FiPhone } from 'react-icons/fi';

const renderStoreAddress = (store: StoreLocation) => {
  const parts = [store.street, store.city, store.state, store.postal_code]
    .filter(Boolean)
    .join(', ');
  return parts;
};

export const PickupStoresSection: FC = () => {
  const t = useTranslations('shipping');
  const { cartId, guestSessionId } = useCart();
  const { shippingMethod, shippingSelection, setShippingSelection } =
    useCheckoutShipping();
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const { stores, isLoading } = useGetStoresByCart({
    cartId,
    guestSessionId,
    enabled: shippingMethod === 'pickup' && !!cartId,
  });

  useEffect(() => {
    if (stores?.length) {
      startTransition(() => {
        setSelectedStoreId((prev) => prev ?? stores[0].id);
      });
    }
  }, [stores]);

  useEffect(() => {
    if (selectedStoreId) {
      setShippingSelection({ storeId: selectedStoreId });
    }
  }, [selectedStoreId, setShippingSelection]);

  useEffect(() => {
    if (
      shippingMethod === 'pickup' &&
      selectedStoreId &&
      shippingSelection.pickupDate &&
      shippingSelection.pickupSlotId
    ) {
      // Selection is tracked locally; backend save will be handled in a later flow.
    }
  }, [
    shippingMethod,
    selectedStoreId,
    shippingSelection.pickupDate,
    shippingSelection.pickupSlotId,
  ]);

  if (shippingMethod !== 'pickup') {
    return null;
  }

  if (!cartId) {
    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            {t('titles.pickupStore')}
          </h2>
        </div>
        <p className="text-sm text-gray-600">{t('pickup.addItemsPrompt')}</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          {t('titles.pickupStore')}
        </h2>
      </div>

      {isLoading && !stores?.length ? <PickupStoresSkeleton /> : null}

      {!isLoading && !stores?.length ? (
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
          <FiInbox className="h-5 w-5 text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">
              {t('pickup.emptyTitle')}
            </p>
            <p className="text-xs text-gray-500">
              {t('pickup.emptyDescription')}
            </p>
          </div>
        </div>
      ) : null}

      {stores?.length ? (
        <StaggerContainer
          mode="animate"
          staggerChildren={0.08}
          delayChildren={0.05}
          className="space-y-4"
        >
          {stores.map((store) => {
            const selected = selectedStoreId === store.id;
            const firstProduct = store.products?.[0];
            return (
              <StaggerItem
                key={store.id}
                type="slideUp"
                distance={18}
                duration={0.35}
              >
                <button
                  type="button"
                  onClick={() => setSelectedStoreId(store.id)}
                  className={`w-full text-left rounded-xl border px-4 py-3 shadow-sm transition-colors ${selected ? 'border-deep-maroon bg-[#fff3f3]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4F4] text-deep-maroon">
                      <FiMapPin className="h-4 w-4" />
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {store.name}
                        </p>
                        <span
                          className={`inline-flex h-4 w-4 rounded-full border-2 ${selected ? 'border-deep-maroon bg-deep-maroon' : 'border-gray-300 bg-white'}`}
                          aria-hidden
                        />
                      </div>
                      <p className="text-xs text-gray-700">
                        {renderStoreAddress(store)}
                      </p>
                      {store.phone_number ? (
                        <p className="text-xs text-gray-700 inline-flex items-center gap-1">
                          <FiPhone className="h-3 w-3" />
                          {store.phone_number}
                        </p>
                      ) : null}
                      {firstProduct ? (
                        <p className="text-xs text-gray-600">
                          {firstProduct.product_name} — {t('pickup.stock')}:{' '}
                          {firstProduct.stock}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      ) : null}
    </section>
  );
};

export default PickupStoresSection;
