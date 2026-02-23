import type { OrderDetailData } from '@/types/response';
import { formatDateWithOrdinal } from '@/utils/date';
import { FC } from 'react';
import { FiBox } from 'react-icons/fi';

interface ExpectedDeliveryCardProps {
  order: OrderDetailData;
}

const ExpectedDeliveryCard: FC<ExpectedDeliveryCardProps> = ({ order }) => {
  const label = order.delivery_card?.title || order.header.delivery_label;
  const formattedDate = formatDateWithOrdinal(order.header.delivery_date);
  const subtitle =
    order.delivery_card?.subtitle || `Delivery expected on ${formattedDate}`;

  return (
    <section className="rounded-sm border border-red-100 bg-[#FFF5F4] px-4 py-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-deep-maroon">
        <FiBox className="w-4 h-4" />
      </div>
      <div className="flex flex-col text-sm">
        <span className="font-semibold text-[#C0392B]">{label}</span>
        <span className="text-xs text-green-600">{subtitle}</span>
      </div>
    </section>
  );
};

export default ExpectedDeliveryCard;
