'use client';

import { FC } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { PiStorefrontFill } from 'react-icons/pi';

const supportOptions = [
  {
    id: 'call',
    label: 'Call Customer Support',
    icon: FaPhoneAlt,
  },
  {
    id: 'write',
    label: 'Write to us',
    icon: BsChatDots,
  },
  {
    id: 'return',
    label: 'Return Policy',
    icon: PiStorefrontFill,
  },
];

export const SupportCard: FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-4">
      <p className="text-lg font-medium mb-2">
        Need help? We&apos;re here for you.
      </p>
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
