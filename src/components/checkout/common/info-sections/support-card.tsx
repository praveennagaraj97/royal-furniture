'use client';

import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { PiStorefrontFill } from 'react-icons/pi';

export const SupportCard: FC = () => {
  const t = useTranslations('checkout.cart.support');

  const supportOptions = [
    {
      id: 'call',
      label: t('call'),
      icon: FaPhoneAlt,
    },
    {
      id: 'write',
      label: t('write'),
      icon: BsChatDots,
    },
    {
      id: 'return',
      label: t('return'),
      icon: PiStorefrontFill,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-4">
      <p className="text-lg font-medium mb-2">{t('title')}</p>
      <ul className="space-y-3">
        {supportOptions.map(({ id, label, icon: Icon }) => (
          <li key={id} className="flex items-center gap-3">
            <Icon className="text-deep-maroon w-5 h-5" />
            <button
              type="button"
              className="text-gray-600 hover:underline text-left"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
