import { useFormatCurrency } from '@/hooks/use-format-currency';
import type { OrderDetailSummary } from '@/types/response';
import { FC } from 'react';

interface OrderSummaryCardProps {
  summary: OrderDetailSummary;
}

const OrderSummaryCard: FC<OrderSummaryCardProps> = ({ summary }) => {
  const formatCurrency = useFormatCurrency();

  const productPrice = formatCurrency(summary.product_price);
  const discountApplied = formatCurrency(summary.discount_applied);
  const totalPayment = formatCurrency(summary.total_payment);

  return (
    <section className="rounded-sm border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        Order Summary
      </h2>
      <dl className="space-y-2 text-xs sm:text-sm text-gray-700">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-gray-500">Item Price</dt>
          <dd className="font-medium">{productPrice}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-gray-500">Discount Applied</dt>
          <dd className="font-medium">{discountApplied}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-gray-500">Coupon Applied</dt>
          <dd className="font-medium text-deep-maroon">0</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-gray-500">Delivery Charge</dt>
          <dd className="font-medium">{summary.shipping}</dd>
        </div>
        <div className="mt-3 border-t border-gray-200 pt-3 flex items-center justify-between gap-2 text-sm">
          <dt className="font-semibold text-gray-900">Total Amount</dt>
          <dd className="font-semibold text-gray-900">{totalPayment}</dd>
        </div>
      </dl>
    </section>
  );
};

export default OrderSummaryCard;
