'use client';

import { useCart } from '@/contexts/cart-context';
import { AppLink } from '@/hooks';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiHeart, FiMapPin, FiShoppingCart } from 'react-icons/fi';

const Utilities: FC = () => {
  const t = useTranslations('common');
  const { items } = useCart();

  const count = items.reduce((s, it) => s + (it.quantity || 0), 0);

  return (
    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 text-sm text-gray-700">
      <AppLink
        href="/"
        className="flex items-center gap-1.5 sm:gap-2 rounded-full text-black hover:text-[#7F1D1D] transition-colors"
      >
        <FiMapPin className="h-5 w-5" />
        <span className="hidden sm:inline">{t('location')}</span>
      </AppLink>
      <AppLink
        href="/user/wishlist"
        className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors"
      >
        <FiHeart className="h-5 w-5" />
      </AppLink>
      <AppLink
        href="/checkout/cart"
        className="relative flex items-center gap-1 rounded-full text-black hover:text-[#7F1D1D] transition-colors"
      >
        <FiShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 min-w-4.5 h-4 px-1.5 rounded-full bg-deep-maroon text-white text-xs font-semibold flex items-center justify-center">
            {count}
          </span>
        )}
      </AppLink>
    </div>
  );
};

export default Utilities;
