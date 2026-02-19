'use client';

import { useCart } from '@/contexts/cart-context';
import { formatDateWithOrdinal } from '@/utils/date';
import { FC, useEffect, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import CustomDeliveryModal from './custom-delivery-modal';

const DeliveryOptionsSection: FC = () => {
  const { shippingStep, isShippingLoading } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = useMemo(
    () => shippingStep?.deliverySlots?.map((slot) => slot.timeRange) || [],
    [shippingStep?.deliverySlots],
  );

  useEffect(() => {
    if (shippingStep?.defaultDeliveryDate) {
      setSelectedDate(shippingStep.defaultDeliveryDate);
    }
    if (shippingStep?.selectedDeliverySlot?.slot) {
      setSelectedTime(shippingStep.selectedDeliverySlot.slot);
    } else if (timeSlots.length) {
      setSelectedTime(timeSlots[0]);
    }
  }, [
    shippingStep?.defaultDeliveryDate,
    shippingStep?.selectedDeliverySlot?.slot,
    timeSlots,
  ]);

  return (
    <section className="space-y-4">
      <h2 className="text-base sm:text-lg font-medium text-gray-900">
        Pick a convenient Date &amp; Time
      </h2>

      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between space-x-3 rounded-lg bg-[#fff5f5] px-3 py-2">
          <div className="flex items-center gap-2">
            <FiClock className="h-4 w-4 text-deep-maroon" />
            <div className="text-xs sm:text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Custom Delivery</p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Extra charges may apply for custom delivery
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md bg-deep-maroon px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#6b0000]"
            onClick={() => setShowModal(true)}
            disabled={isShippingLoading}
          >
            Choose
          </button>
        </div>

        {shippingStep?.defaultDeliveryDate && (
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-600">
            <span className="font-semibold text-gray-900">
              Default delivery date
            </span>
            <span>
              {formatDateWithOrdinal(shippingStep.defaultDeliveryDate)}{' '}
              {shippingStep.selectedDeliverySlot?.slot
                ? `(${shippingStep.selectedDeliverySlot.slot})`
                : ''}
            </span>
          </div>
        )}

        {/* Show the selected date and time stamp */}
        {selectedDate && selectedTime && (
          <div className="pt-2 text-[11px] sm:text-xs text-gray-600">
            <p className="font-semibold text-deep-maroon mb-0.5">
              Your delivery is scheduled!
            </p>
            <p>
              {formatDateWithOrdinal(selectedDate ?? undefined)} between{' '}
              {selectedTime}
            </p>
          </div>
        )}
      </div>
      <CustomDeliveryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        timeSlots={timeSlots}
      />
    </section>
  );
};

export default DeliveryOptionsSection;
