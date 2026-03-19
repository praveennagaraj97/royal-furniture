'use client';

import { SlideIn } from '@/components/shared/animations';
import { useCheckoutShipping } from '@/contexts/shipping-context';
import { buildIso, formatDateWithOrdinal, parseDateInput } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { FC, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import CustomDeliveryModal from './custom-delivery-modal';

const DeliveryOptionsSection: FC = () => {
  const t = useTranslations('shipping');
  const [isSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    shippingData,
    isShippingFetching: isShippingLoading,
    shippingSelection,
    setShippingSelection,
  } = useCheckoutShipping();

  const timeSlots = useMemo(
    () => (shippingData?.delivery_slots || []).map((slot) => slot.time_range),
    [shippingData?.delivery_slots],
  );

  const highlightedDefaultDate = useMemo(() => {
    const parsed = parseDateInput(shippingData?.default_delivery_date);
    return parsed ? buildIso(parsed) : null;
  }, [shippingData?.default_delivery_date]);

  const selectedDate = shippingSelection.date;
  const selectedTime = shippingSelection.slotLabel;

  const handleDateChange = (date: string | null) => {
    setShippingSelection({
      date,
      isCustomDelivery: Boolean(date && (shippingSelection.slotId ?? null)),
    });
  };

  const handleTimeChange = (slot: string | null) => {
    const slotId = shippingData?.delivery_slots.find(
      (s) => s.time_range === slot,
    )?.id;

    setShippingSelection({
      slotLabel: slot,
      slotId: slotId ?? null,
      isCustomDelivery: Boolean((slotId ?? null) && shippingSelection.date),
    });
  };

  const handleSaveCustomDelivery = async (): Promise<boolean> => true;

  return (
    <SlideIn className="space-y-4">
      <h2 className="text-base sm:text-lg font-medium text-gray-900">
        {t('delivery.title')}
      </h2>

      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between space-x-3 rounded-lg bg-[#fff5f5] px-3 py-2">
          <div className="flex items-center gap-2">
            <FiClock className="h-4 w-4 text-deep-maroon" />
            <div className="text-xs sm:text-sm text-gray-700">
              <p className="font-semibold text-gray-900">
                {t('delivery.customDelivery')}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                {t('delivery.customDeliveryDescription')}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md bg-deep-maroon px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#6b0000]"
            onClick={() => setShowModal(true)}
            disabled={isShippingLoading}
          >
            {t('delivery.choose')}
          </button>
        </div>

        {shippingData?.default_delivery_date && (
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-600">
            <span className="font-semibold text-gray-900">
              {t('delivery.estimatedDate')}
            </span>
            <span>
              {formatDateWithOrdinal(shippingData.default_delivery_date)}{' '}
              {shippingData.selected_delivery_slot?.slot
                ? `(${shippingData.selected_delivery_slot.slot})`
                : ''}
            </span>
          </div>
        )}

        {/* Show the selected date and time stamp */}
        {selectedDate && selectedTime && (
          <div className="pt-2 text-[11px] sm:text-xs text-gray-600">
            <p className="font-semibold text-deep-maroon mb-0.5">
              {t('delivery.scheduledTitle')}
            </p>
            <p>
              {t('delivery.scheduledText', {
                date: formatDateWithOrdinal(selectedDate ?? undefined),
                time: selectedTime,
              })}
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
          highlightedDefaultDate ? t('delivery.highlightedLabel') : undefined
        }
        onSaveSelection={handleSaveCustomDelivery}
        isSavingSelection={isSaving}
        customDeliveryCharge={
          shippingData?.custom_delivery_charge === undefined ||
          shippingData.custom_delivery_charge === null
            ? null
            : Number.isFinite(Number(shippingData.custom_delivery_charge))
              ? Number(shippingData.custom_delivery_charge)
              : null
        }
      />
    </SlideIn>
  );
};

export default DeliveryOptionsSection;
