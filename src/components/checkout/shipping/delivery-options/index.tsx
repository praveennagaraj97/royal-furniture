'use client';

import type { ShippingStepState } from '@/types/cart';
import { buildIso, formatDateWithOrdinal, parseDateInput } from '@/utils/date';
import { FC, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import type { ShippingSelection } from '../types';
import CustomDeliveryModal from './custom-delivery-modal';

interface DeliveryOptionsSectionProps {
  shippingStep?: ShippingStepState;
  isShippingLoading: boolean;
  shippingSelection: ShippingSelection;
  setShippingSelection: (update: Partial<ShippingSelection>) => void;
}

const DeliveryOptionsSection: FC<DeliveryOptionsSectionProps> = ({
  shippingStep,
  isShippingLoading,
  shippingSelection,
  setShippingSelection,
}) => {
  const [isSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const timeSlots = useMemo(
    () => shippingStep?.deliverySlots?.map((slot) => slot.timeRange) || [],
    [shippingStep?.deliverySlots],
  );

  const highlightedDefaultDate = useMemo(() => {
    const parsed = parseDateInput(shippingStep?.defaultDeliveryDate);
    return parsed ? buildIso(parsed) : null;
  }, [shippingStep?.defaultDeliveryDate]);

  const selectedDate = shippingSelection.date;
  const selectedTime = shippingSelection.slotLabel;

  const handleDateChange = (date: string | null) => {
    setShippingSelection({
      date,
      isCustomDelivery: Boolean(date && (shippingSelection.slotId ?? null)),
    });
  };

  const handleTimeChange = (slot: string | null) => {
    const slotId = shippingStep?.deliverySlots.find(
      (s) => s.timeRange === slot,
    )?.id;

    setShippingSelection({
      slotLabel: slot,
      slotId: slotId ?? null,
      isCustomDelivery: Boolean((slotId ?? null) && shippingSelection.date),
    });
  };

  const handleSaveCustomDelivery = async (): Promise<boolean> => true;

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
              Estimated delivery date
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
        setSelectedDate={handleDateChange}
        selectedTime={selectedTime}
        setSelectedTime={(time) => handleTimeChange(time)}
        timeSlots={timeSlots}
        highlightedDate={highlightedDefaultDate}
        highlightedLabel={
          highlightedDefaultDate ? `Estimated delivery date` : undefined
        }
        onSaveSelection={handleSaveCustomDelivery}
        isSavingSelection={isSaving}
        customDeliveryCharge={shippingStep?.customDeliveryCharge}
      />
    </section>
  );
};

export default DeliveryOptionsSection;
