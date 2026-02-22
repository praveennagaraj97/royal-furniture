import { FC } from 'react';
import { FiBox } from 'react-icons/fi';
import type { OrderListItem } from '../types';

interface ExpectedDeliveryCardProps {
  order: OrderListItem;
}

const ExpectedDeliveryCard: FC<ExpectedDeliveryCardProps> = ({ order }) => {
  return (
    <section className="rounded-sm border border-red-100 bg-[#FFF5F4] px-4 py-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-deep-maroon">
        <FiBox className="w-4 h-4" />
      </div>
      <div className="flex flex-col text-sm">
        <span className="font-semibold text-[#C0392B]">Expected Delivery</span>
        <span className="text-xs text-green-600">
          Arriving Today, {order.timeWindow}
        </span>
      </div>
    </section>
  );
};

export default ExpectedDeliveryCard;
