'use client';

import { useCart } from '@/contexts/cart-context';
import { formatCurrency } from '@/utils/format-currency';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { FaTruckFast } from 'react-icons/fa6';

export const CartFreeShippingBanner: FC = () => {
  const t = useTranslations('checkout.cart.freeShipping');
  const params = useParams<{ country?: string; locale?: string }>();
  const locale = params?.locale ?? 'en';
  const countryCode = params?.country ?? 'ae';
  const {
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
    if (amountToFreeShipping > 0) {
      const formattedAmount = formatCurrency(
        amountToFreeShipping,
        countryCode,
        locale,
      );

      return t.rich('addMore', {
        amount: (chunks) => (
          <span className="text-[#007B35] font-semibold">{chunks}</span>
        ),
        value: formattedAmount,
      });
    }

    if (freeShippingMessage) return freeShippingMessage;

    return t('unlocked');
  }, [amountToFreeShipping, countryCode, locale, freeShippingMessage, t]);

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
