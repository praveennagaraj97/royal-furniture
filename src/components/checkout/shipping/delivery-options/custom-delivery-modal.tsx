'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import DatePicker from '@/components/shared/inputs/date-picker';
import Modal from '@/components/shared/modal';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FiX } from 'react-icons/fi';

interface CustomDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  timeSlots: string[];
  highlightedDate?: string | null;
  highlightedLabel?: string;
  minDate?: string;
  onSaveSelection: () => Promise<boolean>;
  isSavingSelection: boolean;
  customDeliveryCharge?: number | null;
  title?: string;
  description?: string;
}

export const CustomDeliveryModal: FC<CustomDeliveryModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots,
  highlightedDate,
  highlightedLabel,
  minDate,
  onSaveSelection,
  isSavingSelection,
  customDeliveryCharge,
  title,
  description,
}) => {
  const t = useTranslations('shipping');
  const highlightedDateValue = highlightedDate || undefined;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" variant="center">
      <div className="w-full flex justify-center">
        <StaggerContainer
          mode="animate"
          staggerChildren={0.08}
          delayChildren={0.05}
          className="p-6 w-full space-y-5"
        >
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {title ?? t('delivery.customDelivery')}
              </h2>
              <button
                type="button"
                aria-label={t('actions.cancel')}
                onClick={onClose}
                className="rounded-full p-1.5 bg-deep-maroon hover:bg-[#6b0000] text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <p className="font-semibold text-gray-900 mb-2">
              {description ?? t('delivery.selectPrompt')}
            </p>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {t('delivery.selectDate')}
              </label>
              <div className="flex items-center gap-2">
                <DatePicker
                  value={selectedDate ?? undefined}
                  onChange={setSelectedDate}
                  className="w-full"
                  placeholder={t('delivery.deliveryDatePlaceholder')}
                  minDate={minDate}
                  highlightedDates={
                    highlightedDateValue ? [highlightedDateValue] : []
                  }
                  highlightedLabel={highlightedLabel}
                />
              </div>
            </div>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                {t('delivery.selectTime')}
              </label>
              <div className="flex gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${selectedTime === slot ? 'border-deep-maroon text-deep-maroon' : 'border-gray-200 text-gray-700 hover:border-deep-maroon hover:text-deep-maroon'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {customDeliveryCharge ? (
            <>
              <StaggerItem type="slideUp" distance={20} duration={0.35}>
                <p className="text-xs text-gray-600 mb-2">
                  {t('delivery.customDeliveryNote')}
                </p>
              </StaggerItem>
              <StaggerItem type="slideUp" distance={20} duration={0.35}>
                <div className="rounded-lg bg-gray-100 px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>{t('delivery.chargesTitle')}</span>
                  <span className="font-bold text-lg">
                    {customDeliveryCharge}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {t('delivery.chargesDescription')}
                </p>
              </StaggerItem>
            </>
          ) : null}
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <button
              type="button"
              className={`w-full mt-2 rounded-lg font-semibold py-2 text-base transition-colors ${selectedDate && selectedTime && !isSavingSelection ? 'bg-deep-maroon text-white hover:bg-[#6b0000]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!selectedDate || !selectedTime || isSavingSelection}
              onClick={async () => {
                if (!selectedDate || !selectedTime) return;
                const saved = await onSaveSelection();
                if (saved) onClose();
              }}
            >
              {isSavingSelection
                ? t('delivery.saving')
                : t('delivery.continue')}
            </button>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </Modal>
  );
};

export default CustomDeliveryModal;
