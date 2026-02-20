'use client';

import { useCart } from '@/contexts/cart-context';
import { FC } from 'react';
import CartEmptyState from '../empty-state';
import { CartFreeShippingBanner } from '../free-shipping';
import { CartItemRow } from './cart-item-row';

export const CartItemsSection: FC = () => {
  const { items, updateQuantity, removeItem, pendingActions, header } =
    useCart();

  if (!items.length) {
    return <CartEmptyState />;
  }

  return (
    <div className="rounded-2xl space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">
            Your cart (
            {header?.total_items ??
              items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
            items)
          </h1>
          <CartFreeShippingBanner />
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-[0.9fr_1.6fr_1fr_1fr_1fr] text-xs font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-200 pb-3">
        <span>Item</span>
        <span>Description</span>
        <span>Price</span>
        <span>Quantity</span>
        <span className="text-right">Total Price</span>
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
                  | undefined
              }
              onQuantityChange={(quantity: number) =>
                updateQuantity(item.cartItemId, quantity)
              }
              onRemove={() => removeItem(item.cartItemId)}
            />
          );
        })}
      </div>
    </div>
  );
};
