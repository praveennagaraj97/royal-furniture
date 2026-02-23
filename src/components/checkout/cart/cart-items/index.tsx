'use client';

import { useCart } from '@/contexts/cart-context';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import CartEmptyState from '../empty-state';
import { CartFreeShippingBanner } from '../free-shipping';
import { CartItemRow } from './cart-item-row';

export const CartItemsSection: FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    saveForLater,
    pendingActions,
    header,
  } = useCart();
  const t = useTranslations('checkout.cart.items');

  if (!items.length) {
    return <CartEmptyState />;
  }

  return (
    <div className="rounded-2xl space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">
            {t('title', {
              count:
                header?.total_items ??
                items.reduce((sum, item) => sum + item.quantity, 0),
            })}
          </h1>
          <CartFreeShippingBanner />
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr] text-xs font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-200 pb-3">
        <span>{t('table.item')}</span>
        <span>{t('table.description')}</span>
        <span>{t('table.price')}</span>
        <span>{t('table.quantity')}</span>
        <span className="text-right">{t('table.total')}</span>
      </div>

      <div className="space-y-6">
        {items.map((item) => {
          return (
            <CartItemRow
              key={item.cartItemId}
              item={item}
              pendingAction={
                pendingActions[item.cartItemId] as
                  | 'increase'
                  | 'decrease'
                  | 'remove'
                  | 'save'
                  | undefined
              }
              onQuantityChange={(quantity: number) =>
                updateQuantity(item.cartItemId, quantity)
              }
              onRemove={() => removeItem(item.cartItemId)}
              onSaveForLater={() => saveForLater(item.cartItemId)}
            />
          );
        })}
      </div>
    </div>
  );
};
