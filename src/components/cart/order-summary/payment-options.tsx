'use client';

import { FC } from 'react';

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  accentClass: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'tabby',
    title: 'tabby',
    description:
      '4 interest-free payments or as low as ฿1121.25/month. More options.',
    accentClass: 'bg-[#122838]',
  },
  {
    id: 'tamara',
    title: 'tamara',
    description:
      'Or split in 4 payments of ฿1,121.25. No late fees, Sharia compliant! Learn more.',
    accentClass: 'bg-[#ffefeb] text-[#c75a2a]',
  },
];

export const PaymentOptions: FC = () => {
  return (
    <div className="space-y-3">
      {paymentOptions.map((option) => (
        <div
          key={option.id}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-start gap-3"
        >
          <div
            className={`capitalize px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-white ${option.accentClass}`}
          >
            {option.title}
          </div>
          <p className="text-sm text-gray-600 leading-snug">
            {option.description}
          </p>
        </div>
      ))}
    </div>
  );
};
