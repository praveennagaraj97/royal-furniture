'use client';

import { useCart } from '@/contexts/cart-context';
import { FC, useMemo } from 'react';
import { FiGift } from 'react-icons/fi';

export const CartFreeShippingBanner: FC = () => {
  const { currency, amountToFreeShipping, freeShippingThreshold, totals } =
    useCart();

  const progress = useMemo(() => {
    if (freeShippingThreshold === 0) return 100;
    return Math.min(
      100,
      Math.round((totals.subtotal / freeShippingThreshold) * 100),
    );
  }, [totals.subtotal, freeShippingThreshold]);

  const message =
    amountToFreeShipping > 0
      ? `Add ${currency}${amountToFreeShipping.toFixed(0)} more for Free Shipping!`
      : 'You have unlocked Free Shipping!';

  return (
    <div className="rounded-xl border border-[#ffe1e1] bg-[#fff5f5] px-4 py-3 flex flex-col gap-3">
      <div className="flex items-center gap-3 text-sm sm:text-base text-deep-maroon font-semibold">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-deep-maroon shadow-sm">
          <FiGift className="w-4 h-4" />
        </div>
        <span>{message}</span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-full h-2 rounded-full bg-white/80 overflow-hidden">
          <div
            className="h-full bg-deep-maroon rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">
          Cart total: {currency}
          {totals.subtotal.toFixed(0)} / Free shipping at {currency}
          {freeShippingThreshold.toFixed(0)}
        </span>
      </div>
    </div>
  );
};
