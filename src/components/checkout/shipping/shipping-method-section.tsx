'use client';

import { FC, useState } from 'react';
import { FiHome, FiMapPin } from 'react-icons/fi';

export const ShippingMethodSection: FC = () => {
  const [method, setMethod] = useState<'home' | 'store'>('home');

  return (
    <section className="space-y-3">
      <h2 className="text-base sm:text-lg font-medium text-gray-900">
        Shipping Method
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setMethod('home')}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 shadow-sm ${method === 'home' ? 'border-deep-maroon bg-[#fff5f5]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4F4] text-deep-maroon">
            <FiHome className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              Home Delivery
            </span>
            <span className="text-xs text-gray-500">
              We deliver to your doorstep
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMethod('store')}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 shadow-sm ${method === 'store' ? 'border-deep-maroon bg-[#fff5f5]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF4F4] text-deep-maroon">
            <FiMapPin className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              Pickup from store
            </span>
            <span className="text-xs text-gray-500">
              Collect your order from our store
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default ShippingMethodSection;
