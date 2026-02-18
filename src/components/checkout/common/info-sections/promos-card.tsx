'use client';

import { FC, useState } from 'react';
import { FiTag } from 'react-icons/fi';
import PromosModal from './promos-modal';

export const PromosCard: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-deep-maroon">
            <FiTag className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold  ">Promos & Vouchers</p>
            <p className="text-xs text-gray-500 mt-1">
              Apply your coupon codes or vouchers to get additional discounts.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 self-start md:self-center text-sm font-semibold text-deep-maroon hover:text-[#6b0000] transition-colors duration-200"
        >
          View / Enter Code
        </button>
      </div>

      <PromosModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appliedCode={appliedCode}
        onApply={(code) => setAppliedCode(code)}
      />
    </>
  );
};
