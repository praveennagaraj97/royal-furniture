'use client';

import { FC } from 'react';
import { HiMapPin } from 'react-icons/hi2';

export const DeliveryInfoCard: FC = () => {
  return (
    <div className="rounded-xl bg-[#FFF4F4] px-4 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm text-deep-maroon min-w-0 flex-1">
        <HiMapPin className="text-lg shrink-0" />
        <span className="truncate">Delivery on</span>
        <span className="font-semibold text-indigo-slate shrink-0">
          Fri, 28 Feb 2025
        </span>
      </div>
      {/* <button
        type="button"
        className="inline-flex items-center gap-1 self-start text-xs sm:text-sm font-semibold text-indigo-slate hover:underline whitespace-nowrap"
      >
        Update Location
      </button> */}
    </div>
  );
};
