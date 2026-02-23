'use client';

import { useAppRouter } from '@/hooks';
import { orderService } from '@/services/api/order-service';
import { ParsedAPIError } from '@/types/error';
import { FC, useState } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

interface CancelOrderFlowProps {
  orderId: string;
  onClose: () => void;
}

const CancelOrderFlow: FC<CancelOrderFlowProps> = ({ orderId, onClose }) => {
  const router = useAppRouter();
  const [selectedReason, setSelectedReason] = useState('other');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reasons = [
    { value: 'changed_mind', label: 'Changed my mind' },
    { value: 'ordered_by_mistake', label: 'Ordered by mistake' },
    { value: 'found_better_price', label: 'Found a better price' },
    { value: 'delivery_taking_too_long', label: 'Delivery taking too long' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmitCancel = async () => {
    if (selectedReason === 'other' && !customReason.trim()) {
      setError('Please provide a reason for cancelling the order.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await orderService.cancelOrder({
        order_id: orderId,
        reason: selectedReason,
        custom_reason:
          selectedReason === 'other' ? customReason.trim() : undefined,
      });
      onClose();
      router.push(`/user/orders/cancelled?orderId=${orderId}`);
    } catch (e) {
      const parserError = e as ParsedAPIError;
      setError(
        parserError.generalError ||
          'Unable to cancel this order right now. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex justify-center">
        <div className="rounded-full bg-[#FFF5F4] p-3 text-[#C0392B]">
          <FiAlertTriangle className="w-6 h-6" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-base font-semibold text-gray-900">
          Why are you cancelling this order?
        </h3>
        <p className="text-sm text-gray-600">
          This helps us improve your experience and process your cancellation
          faster.
        </p>
      </div>
      <div className="space-y-3 pt-1 text-left">
        <div className="space-y-2">
          {reasons.map((reason) => (
            <label
              key={reason.value}
              className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-deep-maroon/60 cursor-pointer"
            >
              <input
                type="radio"
                name="cancel-reason"
                className="h-4 w-4 text-deep-maroon border-gray-300 focus:ring-deep-maroon"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={() => setSelectedReason(reason.value)}
              />
              <span>{reason.label}</span>
            </label>
          ))}
        </div>

        {selectedReason === 'other' && (
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-600">
              Tell us a bit more (optional)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-deep-maroon focus:border-deep-maroon"
              placeholder="e.g. I changed my mind about this purchase"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            disabled={isSubmitting}
          >
            Keep my order
          </button>
          <button
            type="button"
            onClick={handleSubmitCancel}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#C0392B] rounded-lg hover:bg-[#a83224] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <FiRefreshCw className="w-4 h-4 animate-spin" />}
            Yes, cancel order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderFlow;
