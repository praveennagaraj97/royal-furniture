import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import DatePicker from '@/components/shared/inputs/date-picker';
import Modal from '@/components/shared/modal';
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
}

export const CustomDeliveryModal: FC<CustomDeliveryModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots,
}) => {
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
              <h2 className="text-lg font-semibold">Custom Delivery</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="rounded-full p-1.5 bg-deep-maroon hover:bg-[#6b0000] text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <p className="font-semibold text-gray-900 mb-2">
              Select your desired delivery date and time
            </p>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Date</label>
              <DatePicker
                value={selectedDate ?? undefined}
                onChange={setSelectedDate}
                className="w-full"
                placeholder="Delivery Date"
              />
            </div>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Time</label>
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
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <p className="text-xs text-gray-600 mb-2">
              Choosing a custom delivery time may incur additional charges as
              per company policy
            </p>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <div className="rounded-lg bg-gray-100 px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Charge for custom delivery</span>
              <span className="font-bold text-lg">₿ 55</span>
            </div>
            <p className="text-xs text-gray-500">
              This charge is based on your currently selected location.
            </p>
          </StaggerItem>
          <StaggerItem type="slideUp" distance={20} duration={0.35}>
            <button
              type="button"
              className={`w-full mt-2 rounded-lg font-semibold py-2 text-base transition-colors ${selectedDate && selectedTime ? 'bg-deep-maroon text-white hover:bg-[#6b0000]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!selectedDate || !selectedTime}
              onClick={() => {
                if (selectedDate && selectedTime) onClose();
              }}
            >
              Continue
            </button>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </Modal>
  );
};

export default CustomDeliveryModal;
