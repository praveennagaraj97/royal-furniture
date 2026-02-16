'use client';

import { FC } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

export const DeliveryInfoCard: FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-[#ffe1e1] bg-[#fff6f6] px-4 py-4">
      <div className="flex items-start gap-3 text-sm text-gray-700">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-deep-maroon shadow-sm">
          <FiCalendar className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            Delivery on Fri, 28 Feb 2025
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Estimated delivery date based on your saved address.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 self-start md:self-center text-sm font-semibold text-deep-maroon hover:text-[#6b0000] transition-colors duration-200"
      >
        <FiMapPin className="w-4 h-4" />
        Update Location
      </button>
    </div>
  );
};
