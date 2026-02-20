'use client';

import { useCart } from '@/contexts/cart-context';
import { useGetStoresByCart } from '@/hooks/api';
import type { StoreLocation } from '@/types/store';
import { FC, startTransition, useEffect, useState } from 'react';
import { FiMapPin, FiPhone } from 'react-icons/fi';

const renderStoreAddress = (store: StoreLocation) => {
  const parts = [store.street, store.city, store.state, store.postal_code]
    .filter(Boolean)
    .join(', ');
  return parts;
};

export const PickupStoresSection: FC = () => {
  const { cartId, guestSessionId, shippingMethod } = useCart();
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

  if (shippingMethod !== 'pickup') {
    return null;
  }

  if (!cartId) {
    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            Pickup store
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Add items to your cart to see available pickup locations.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          Pickup store
        </h2>
      </div>

      {isLoading && !stores?.length ? (
        <p className="text-sm text-gray-600">Loading nearby stores...</p>
      ) : null}

      {!isLoading && !stores?.length ? (
        <p className="text-sm text-gray-600">
          No pickup stores available for this cart yet.
        </p>
      ) : null}

      {stores?.length ? (
        <div className="space-y-4">
          {stores.map((store) => {
            const selected = selectedStoreId === store.id;
            const firstProduct = store.products?.[0];
            return (
              <button
                key={store.id}
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
                        {firstProduct.product_name} — Stock:{' '}
                        {firstProduct.stock}
                      </p>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};

export default PickupStoresSection;
