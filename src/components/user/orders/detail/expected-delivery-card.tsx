import CustomDeliveryModal from '@/components/checkout/shipping/delivery-options/custom-delivery-modal';
import { useToast } from '@/contexts/toast-context';
import { useGetOrderDeliverySlots } from '@/hooks/api';
import { orderService } from '@/services/api/order-service';
import type { OrderDetailData } from '@/types/response';
import { formatDateWithOrdinal } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { FC, useMemo, useState } from 'react';
import { FiBox } from 'react-icons/fi';

interface ExpectedDeliveryCardProps {
  order: OrderDetailData;
  canCancel?: boolean;
  onDeliveryUpdated?: () => void;
}

const ExpectedDeliveryCard: FC<ExpectedDeliveryCardProps> = ({
  order,
  canCancel = false,
  onDeliveryUpdated,
}) => {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [isSavingSelection, setIsSavingSelection] = useState(false);

  const { slots } = useGetOrderDeliverySlots({ enabled: canCancel });
  const { showSuccess, showError } = useToast();
  const tShipping = useTranslations('shipping');

  const label = order.delivery_card?.title || order.header.delivery_label;
  const formattedDate = formatDateWithOrdinal(order.header.delivery_date);
  const subtitle =
    order.delivery_card?.subtitle || `Delivery expected on ${formattedDate}`;

  const timeSlots = useMemo(
    () => slots.map((slot) => slot.time_range),
    [slots],
  );

  const handleOpenChangeModal = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedSlotId(null);
    setIsChangeOpen(true);
  };

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time);
    if (!time) {
      setSelectedSlotId(null);
      return;
    }

    const matchedSlot = slots.find((slot) => slot.time_range === time);
    setSelectedSlotId(matchedSlot?.id ?? null);
  };

  const handleSaveSelection = async (): Promise<boolean> => {
    if (!selectedDate || !selectedSlotId) {
      return false;
    }

    try {
      setIsSavingSelection(true);
      await orderService.updateDeliveryPreferences({
        order_id: order.id,
        delivery_date: selectedDate,
        slot_id: selectedSlotId,
      });

      showSuccess('Delivery date updated successfully');
      if (onDeliveryUpdated) {
        await onDeliveryUpdated();
      }

      return true;
    } catch (error) {
      console.error('Failed to update delivery preferences', error);
      showError('Failed to update delivery date. Please try again.');
      return false;
    } finally {
      setIsSavingSelection(false);
    }
  };

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
            onClick={handleOpenChangeModal}
            className="text-sm font-medium text-indigo-slate hover:underline focus:outline-none"
          >
            Change
          </button>
        )}
      </section>

      {canCancel && (
        <CustomDeliveryModal
          isOpen={isChangeOpen}
          onClose={() => setIsChangeOpen(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={handleTimeChange}
          timeSlots={timeSlots}
          highlightedDate={order.header.delivery_date}
          highlightedLabel={
            order.header.delivery_date
              ? tShipping('delivery.highlightedLabel')
              : undefined
          }
          onSaveSelection={handleSaveSelection}
          isSavingSelection={isSavingSelection}
          title="Change delivery date"
          description="Select a new delivery date and time for this order"
        />
      )}
    </>
  );
};

export default ExpectedDeliveryCard;
