import type { OrderDetailData } from '@/types/response';
import { formatDateWithOrdinal } from '@/utils/date';
import { FC, useState } from 'react';
import { FiBox } from 'react-icons/fi';
import NeedHelpModal from '../need-help-actions';

interface ExpectedDeliveryCardProps {
  order: OrderDetailData;
  canCancel?: boolean;
}

const ExpectedDeliveryCard: FC<ExpectedDeliveryCardProps> = ({
  order,
  canCancel = false,
}) => {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const label = order.delivery_card?.title || order.header.delivery_label;
  const formattedDate = formatDateWithOrdinal(order.header.delivery_date);
  const subtitle =
    order.delivery_card?.subtitle || `Delivery expected on ${formattedDate}`;

  return (
    <>
      <section className="rounded-sm border border-red-100 bg-[#FFF5F4] px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-full bg-white flex items-center justify-center text-deep-maroon">
            <FiBox className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-[#C0392B]">{label}</span>
            <span className="text-xs text-green-600">{subtitle}</span>
          </div>
        </div>

        {canCancel && (
          <button
            type="button"
            onClick={() => setIsCancelOpen(true)}
            className="text-sm font-medium text-indigo-slate hover:underline focus:outline-none"
          >
            Cancel
          </button>
        )}
      </section>

      {canCancel && (
        <NeedHelpModal
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          orderUuid={order.id}
          orderCode={order.order_id}
          initialStep="cancel-reason"
        />
      )}
    </>
  );
};

export default ExpectedDeliveryCard;
