'use client';

import { useCart } from '@/contexts/cart-context';
import { FC, useMemo } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';

const formatCurrency = (currency: string, amount: number) => {
  return `${currency}${amount.toFixed(0)}`;
};

export const OrderSummaryCard: FC = () => {
  const { currency, totals } = useCart();

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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-7 space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="space-y-4">
        {summaryRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm text-gray-700"
          >
            <span>{row.label}</span>
            <span
              className={`font-semibold ${
                row.emphasis === 'positive'
                  ? 'text-[#007B35]'
                  : row.emphasis === 'accent'
                    ? 'text-[#5c2ea5]'
                    : 'text-gray-900'
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-base font-semibold text-gray-900">
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
