'use client';

import { SlideIn } from '@/components/shared/animations';
import DatePicker from '@/components/shared/inputs/date-picker';
import { useCheckoutShipping } from '@/contexts/shipping-context';
import { buildIso, parseDateInput } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';

const PickupOptionsSection: FC = () => {
  const t = useTranslations('shipping');
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

  const selectedDate = shippingSelection.pickupDate;
  const selectedTime = shippingSelection.pickupSlotLabel;

  const handleDateChange = (date: string | null) => {
    setShippingSelection({
      pickupDate: date,
    });
  };

  const handleTimeChange = (slot: string | null) => {
    const slotId = shippingData?.delivery_slots.find(
      (s) => s.time_range === slot,
    )?.id;

    setShippingSelection({
      pickupSlotLabel: slot,
      pickupSlotId: slotId ?? null,
    });
  };

  return (
    <SlideIn className="space-y-4">
      <h2 className="text-base sm:text-lg font-medium text-gray-900">
        {t('pickup.optionsTitle')}
      </h2>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {t('pickup.selectDate')}
            </label>

            <span
              className="inline-block px-2 py-0.5 text-xs font-medium rounded-sm bg-red-100 text-red-700 border border-red-200"
              aria-label={t('pickup.requiredbadge')}
            >
              {t('pickup.requiredbadge')}
            </span>
          </div>

          <DatePicker
            value={selectedDate ?? undefined}
            onChange={handleDateChange}
            className="w-full"
            placeholder={t('pickup.datePlaceholder')}
            minDate={
              shippingData?.default_delivery_date
                ? buildIso(parseDateInput(shippingData.default_delivery_date)!)
                : undefined
            }
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('pickup.selectTime')}
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={isShippingLoading}
                onClick={() => handleTimeChange(slot)}
                className={`rounded-md border p-2 text-sm font-medium transition-colors ${selectedTime === slot ? 'border-deep-maroon bg-[#fff5f5] text-deep-maroon' : 'border-gray-200 text-gray-700 hover:border-deep-maroon hover:text-deep-maroon'} ${isShippingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SlideIn>
  );
};

export default PickupOptionsSection;
