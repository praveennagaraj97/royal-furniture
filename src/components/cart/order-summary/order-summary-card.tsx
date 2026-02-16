'use client';

import Modal from '@/components/shared/modal';
import { useCart } from '@/contexts/cart-context';
import { FC, useMemo, useState } from 'react';
import { FiArrowRightCircle, FiInfo } from 'react-icons/fi';
import ShippingFeesInfo from './shipping-fees-info';

const formatCurrency = (currency: string, amount: number) => {
  return `${currency}${amount.toFixed(0)}`;
};

export const OrderSummaryCard: FC = () => {
  const { currency, totals } = useCart();

  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false);

  const summaryRows = useMemo(
    () => [
      {
        label: 'Item Price',
        value: formatCurrency(currency, totals.subtotal),
        emphasis: 'default' as const,
      },
      {
        label: 'Discount Applied',
        value:
          totals.discount > 0
            ? `-${formatCurrency(currency, totals.discount)}`
            : `${currency}0`,
        emphasis: 'positive' as const,
      },
      {
        label: 'Coupon Applied',
        value:
          totals.coupon > 0
            ? `-${formatCurrency(currency, totals.coupon)}`
            : `${currency}0`,
        emphasis: 'accent' as const,
      },
      {
        label: 'Delivery Charges',
        value:
          totals.shipping === 0
            ? 'Free'
            : formatCurrency(currency, totals.shipping),
        emphasis: totals.shipping === 0 ? 'positive' : 'default',
      },
    ],
    [currency, totals],
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-6">
      <h2 className="text-lg font-medium  ">Order Summary</h2>

      <div className="space-y-4">
        {summaryRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm text-gray-700"
          >
            <span className="flex items-center gap-1">
              <span
                className={
                  row.label === 'Delivery Charges' && totals.shipping === 0
                    ? 'line-through text-gray-400'
                    : ''
                }
              >
                {row.label}
              </span>
              {row.label === 'Delivery Charges' && (
                <span className="relative inline-flex">
                  <button
                    type="button"
                    onClick={() => setIsShippingInfoOpen((open) => !open)}
                    className="inline-flex items-center justify-center"
                  >
                    <FiInfo className="h-4 w-4 text-gray-400 hover:text-indigo-slate cursor-pointer" />
                  </button>
                </span>
              )}
            </span>
            <span
              className={`font-semibold ${
                row.emphasis === 'positive'
                  ? 'text-[#007B35]'
                  : row.emphasis === 'accent'
                    ? 'text-[#5c2ea5]'
                    : ' '
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
        <Modal
          isOpen={isShippingInfoOpen}
          onClose={() => setIsShippingInfoOpen(false)}
          variant="bottom"
          size="sm"
          className="sm:max-w-md"
        >
          <ShippingFeesInfo onClose={() => setIsShippingInfoOpen(false)} />
        </Modal>
        <div className="bg-deep-maroon/5 p-2 rounded-lg border-gray-200 flex items-center justify-between font-medium">
          <span>Total Amount</span>
          <span className="text-deep-maroon">
            {formatCurrency(currency, totals.total)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-deep-maroon text-white py-3 text-sm font-semibold hover:bg-[#6b0000] transition-colors duration-200 shadow-md"
      >
        Proceed to checkout
        <FiArrowRightCircle className="w-4 h-4" />
      </button>
    </div>
  );
};
