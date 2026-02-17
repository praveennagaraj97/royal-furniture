'use client';

import { FC } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';

export const DeliveryOptionsSection: FC = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
        Pick a convenient Date &amp; Time
      </h2>

      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600">
            Select Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-700 focus:border-deep-maroon focus:outline-none focus:ring-1 focus:ring-deep-maroon"
            />
            <FiCalendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#fff5f5] px-3 py-2">
          <div className="flex items-center gap-2">
            <FiClock className="h-4 w-4 text-deep-maroon" />
            <div className="text-xs sm:text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Custom Delivery</p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Extra charges may apply for custom delivery
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md bg-deep-maroon px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#6b0000]"
          >
            Choose
          </button>
        </div>

        <div className="pt-2 text-[11px] sm:text-xs text-gray-600">
          <p className="font-semibold text-deep-maroon mb-0.5">
            Your delivery is scheduled!
          </p>
          <p>5th Mar 2025 between 1 pm - 4 pm</p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryOptionsSection;
