'use client';

import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { HiMiniMapPin } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';

interface ShippingFeesInfoProps {
  onClose?: () => void;
}

export const ShippingFeesInfo: FC<ShippingFeesInfoProps> = ({ onClose }) => {
  const t = useTranslations('checkout.orderSummary.shippingFees');

  return (
    <div className="w-full max-h-[90vh] sm:max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900">{t('title')}</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 bg-deep-maroon hover:bg-[#6b0000] rounded-full transition-colors ml-4 shrink-0"
          >
            <IoClose className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <div className="px-4 pt-3 pb-4 space-y-3 text-sm">
        <div className="flex items-center justify-between rounded-xl bg-pale-blush p-2">
          <span className="text-sm font-medium text-gray-900">
            {t('totalShippingCharge')}
          </span>
          <span className="text-base font-bold tracking-wide text-indigo-slate">
            {t('free')}
          </span>
        </div>

        <p className="text-sm font-medium text-indigo-slate">
          {t('freeShippingMessage')}
        </p>

        <div className="space-y-1 pt-1">
          <h4 className="text-base font-semibold text-gray-900">
            {t('howItWorksTitle')}
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('howItWorksDescription')}
          </p>
        </div>

        <div className="mt-2 space-y-3">
          <div className="flex gap-2 rounded-xl bg-[#fff5f5] p-2 items-start">
            <div className="mt-1 flex items-center justify-center rounded-full text-deep-maroon">
              <HiMiniMapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed text-gray-700">
              <p className="text-sm font-semibold text-gray-900">
                {t('household.title')}
              </p>
              <p className="font-semibold text-[#e00000]">
                {t('household.rate')}
              </p>
              <p>{t('household.description')}</p>
            </div>
          </div>

          <div className="flex gap-2 rounded-xl bg-[#fff5f5] p-2 items-start">
            <div className="text-deep-maroon">
              <HiMiniMapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed text-gray-700">
              <p className="text-sm font-semibold text-gray-900">
                {t('furniture.title')}
              </p>
              <p className="font-semibold text-[#e00000]">
                {t('furniture.rate')}
              </p>
              <p>{t('furniture.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingFeesInfo;
