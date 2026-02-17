'use client';

import { FC } from 'react';
import { HiMiniMapPin } from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';

interface ShippingFeesInfoProps {
  onClose?: () => void;
}

export const ShippingFeesInfo: FC<ShippingFeesInfoProps> = ({ onClose }) => {
  return (
    <div className="w-full max-h-[90vh] sm:max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-900">Shipping Fees</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 bg-deep-maroon hover:bg-[#6b0000] rounded-full transition-colors ml-4 shrink-0"
          >
            <IoClose className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      <div className="px-4 pt-3 pb-4 space-y-3 text-sm">
        <div className="flex items-center justify-between rounded-xl bg-pale-blush p-2">
          <span className="text-sm font-medium text-gray-900">
            Total Shipping Charge
          </span>
          <span className="text-base font-bold tracking-wide text-indigo-slate">
            FREE
          </span>
        </div>

        <p className="text-sm font-medium text-indigo-slate">
          Congrats! You got free shipping on Furniture
        </p>

        <div className="space-y-1 pt-1">
          <h4 className="text-base font-semibold text-gray-900">
            How Shipping Fees Works
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            The charge depends on your order value and the type of products you
            wish to buy.
          </p>
        </div>

        <div className="mt-2 space-y-3">
          <div className="flex gap-2 rounded-xl bg-[#fff5f5] p-2 items-start">
            <div className="mt-1 flex items-center justify-center rounded-full text-deep-maroon">
              <HiMiniMapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed text-gray-700">
              <p className="text-sm font-semibold text-gray-900">
                Household &amp; Small Items Shipping
              </p>
              <p className="font-semibold text-[#e00000]">
                AED 19 On Orders Below AED 99
              </p>
              <p>
                This fee applies to items which are small and easy to assemble.
                Assembly not provided.
              </p>
            </div>
          </div>

          <div className="flex gap-2 rounded-xl bg-[#fff5f5] p-2 items-start">
            <div className="text-deep-maroon">
              <HiMiniMapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed text-gray-700">
              <p className="text-sm font-semibold text-gray-900">
                Furniture &amp; Large Items Shipping
              </p>
              <p className="font-semibold text-[#e00000]">
                AED 79 On Orders Below AED 299
              </p>
              <p>
                This fee applies to furniture and large items which are shipped
                and assembled by our crew.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingFeesInfo;
