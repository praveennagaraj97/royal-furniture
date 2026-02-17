'use client';

import { useCart } from '@/contexts/cart-context';
import { motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { FaTruckFast } from 'react-icons/fa6';

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
        <FaTruckFast className="h-5 w-5 text-deep-maroon" />
        <span>
          {amountToFreeShipping > 0 ? (
            <>
              Add{' '}
              <span className="text-[#007B35]">
                {currency}
                {amountToFreeShipping.toFixed(0)}
              </span>{' '}
              more for Free Shipping!
            </>
          ) : (
            'You have unlocked Free Shipping!'
          )}
        </span>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#007B35]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};
