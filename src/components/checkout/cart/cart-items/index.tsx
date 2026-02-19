'use client';

import { useCart } from '@/contexts/cart-context';
import { FC } from 'react';
import { CartFreeShippingBanner } from '../free-shipping';
import { CartItemRow } from './cart-item-row';

export const CartItemsSection: FC = () => {
  const { items, currency, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-lg font-semibold   mb-2">Your cart is empty</p>
        <p className="text-sm text-gray-500">
          Browse our collections and add products to your cart to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">
            Your cart ({items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
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
        {items.map((item) => (
          <CartItemRow
            key={item.cartItemId || item.id}
            item={item}
            currency={currency}
            onQuantityChange={(quantity) =>
              updateQuantity(item.cartItemId || item.id, quantity)
            }
            onRemove={() => removeItem(item.cartItemId || item.id)}
          />
        ))}
      </div>
    </div>
  );
};
