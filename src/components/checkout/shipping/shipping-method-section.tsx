'use client';

import { useCheckoutShipping } from '@/contexts/shipping-context';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { FiHome, FiMapPin } from 'react-icons/fi';

export const ShippingMethodSection: FC = () => {
  const t = useTranslations('shipping');
  const {
    shippingData,
    isShippingFetching: isShippingLoading,
    shippingMethod,
    setShippingMethod,
  } = useCheckoutShipping();

  const availableMethods = useMemo<('home' | 'pickup')[]>(() => {
    const methods = (shippingData?.delivery_method || []).filter(
      (method): method is 'home' | 'pickup' =>
        method === 'home' || method === 'pickup',
    );

    return methods.length ? methods : ['home', 'pickup'];
  }, [shippingData?.delivery_method]);

  return (
    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-medium text-gray-900">
        {t('titles.shippingMethod')}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setShippingMethod('home')}
          disabled={!availableMethods.includes('home') || isShippingLoading}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 shadow-sm ${shippingMethod === 'home' ? 'border-deep-maroon bg-[#fff5f5]' : 'border-gray-200 bg-white hover:border-gray-300'} ${!availableMethods.includes('home') || isShippingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4F4] text-deep-maroon">
            <FiHome className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {t('method.homeTitle')}
            </span>
            <span className="text-xs text-gray-500">
              {t('method.homeSubtitle')}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setShippingMethod('pickup')}
          disabled={!availableMethods.includes('pickup') || isShippingLoading}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 shadow-sm ${shippingMethod === 'pickup' ? 'border-deep-maroon bg-[#fff5f5]' : 'border-gray-200 bg-white hover:border-gray-300'} ${!availableMethods.includes('pickup') || isShippingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4F4] text-deep-maroon">
            <FiMapPin className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {t('method.pickupTitle')}
            </span>
            <span className="text-xs text-gray-500">
              {t('method.pickupSubtitle')}
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default ShippingMethodSection;
