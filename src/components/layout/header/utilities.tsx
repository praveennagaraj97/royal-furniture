'use client';

import { Heart, MapPin, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const Utilities: FC = () => {
  const t = useTranslations('common');

  return (
    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 text-sm text-gray-700">
      <button className="flex items-center gap-1.5 sm:gap-2 rounded-full text-black hover:text-[#7F1D1D] transition-colors">
        <MapPin className="h-5 w-5" />
        <span className="hidden sm:inline">{t('location')}</span>
      </button>
      <button className="relative rounded-full text-black hover:text-[#7F1D1D] transition-colors">
        <Heart className="h-5 w-5" />
      </button>
      <button className="relative flex items-center gap-1 rounded-full text-black hover:text-[#7F1D1D] transition-colors">
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Utilities;
