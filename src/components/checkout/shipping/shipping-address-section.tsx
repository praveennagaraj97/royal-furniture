'use client';

import { FC } from 'react';

export const ShippingAddressSection: FC = () => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          Shipping address
        </h2>
        <button
          type="button"
          className="text-xs sm:text-sm font-semibold text-indigo-slate hover:underline"
        >
          Change
        </button>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs sm:text-sm text-gray-700 shadow-sm">
        <p className="font-semibold text-gray-900">Jhon Doe</p>
        <p>Flat 203, Karama Centre Building</p>
        <p>Al Karama, Dubai, UAE</p>
        <p>Phone: +971 50 987 6543</p>
      </div>
    </section>
  );
};

export default ShippingAddressSection;
