'use client';

import { useCart } from '@/contexts/cart-context';
import { motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { FaTruckFast } from 'react-icons/fa6';

export const CartFreeShippingBanner: FC = () => {
  const {
    currency,
    amountToFreeShipping,
    freeShippingThreshold,
    totals,
    freeShippingProgress,
    freeShippingMessage,
  } = useCart();

  const progress = useMemo(() => {
    if (freeShippingProgress) return freeShippingProgress;
    if (freeShippingThreshold === 0) return 100;
    return Math.min(
      100,
      Math.round((totals.subtotal / freeShippingThreshold) * 100),
    );
  }, [freeShippingProgress, totals.subtotal, freeShippingThreshold]);

  const bannerText = useMemo(() => {
    if (freeShippingMessage) return freeShippingMessage;
    if (amountToFreeShipping > 0) {
      return (
        <>
          Add{' '}
          <span className="text-[#007B35]">
            {currency}
            {amountToFreeShipping.toFixed(0)}
          </span>{' '}
          more for Free Shipping!
        </>
      );
    }
    return 'You have unlocked Free Shipping!';
  }, [amountToFreeShipping, currency, freeShippingMessage]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
        <FaTruckFast className="h-5 w-5 text-deep-maroon" />
        <span>{bannerText}</span>
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
