'use client';

import { FC } from 'react';
import { FiHeadphones, FiMail, FiRefreshCcw } from 'react-icons/fi';

const supportOptions = [
  {
    id: 'call',
    label: 'Call Customer Support',
    icon: FiHeadphones,
  },
  {
    id: 'write',
    label: 'Write to us',
    icon: FiMail,
  },
  {
    id: 'return',
    label: 'Return Policy',
    icon: FiRefreshCcw,
  },
];

export const SupportCard: FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5">
      <p className="text-sm font-semibold text-gray-900 mb-3">
        Need help? We&apos;re here for you.
      </p>
      <div className="flex flex-col gap-3 text-sm text-deep-maroon font-semibold">
        {supportOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="flex items-center gap-3 text-left hover:text-[#6b0000] transition-colors duration-200"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-maroon/10 text-deep-maroon">
              <Icon className="w-4 h-4" />
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
