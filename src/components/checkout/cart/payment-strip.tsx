'use client';

import { ViewOnce } from '@/components/shared/animations';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

import applePayIcon from '@/assets/payments/apple-pay.png';
import paypalIcon from '@/assets/payments/paypal.png';
import samsungPayIcon from '@/assets/payments/samsung-pay.png';
import tabbyIcon from '@/assets/payments/tabby.png';
import tamaraIcon from '@/assets/payments/tamara.png';

const supportedPayments = [
  { id: 'tamara', icon: tamaraIcon, alt: 'Tamara' },
  { id: 'tabby', icon: tabbyIcon, alt: 'Tabby' },
  { id: 'samsung-pay', icon: samsungPayIcon, alt: 'Samsung Pay' },
  { id: 'apple-pay', icon: applePayIcon, alt: 'Apple Pay' },
  { id: 'paypal', icon: paypalIcon, alt: 'PayPal' },
] as const;

export const CartPaymentStrip: FC = () => {
  const t = useTranslations('product.paymentDelivery');

  return (
    <ViewOnce type="slideUp" distance={20} duration={0.35} delay={0.15}>
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-indigo-slate">
            {t('waysOfPayment')}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {supportedPayments.map((payment) => (
            <Image
              key={payment.id}
              src={payment.icon}
              alt={payment.alt}
              width={72}
              height={32}
              className="h-5 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </ViewOnce>
  );
};

export default CartPaymentStrip;
