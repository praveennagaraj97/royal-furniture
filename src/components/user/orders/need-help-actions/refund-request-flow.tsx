'use client';

import { useAppRouter } from '@/hooks';
import { orderService } from '@/services/api/order-service';
import { FC, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface RefundRequestFlowProps {
  orderId: string;
  onClose: () => void;
}

const RefundRequestFlow: FC<RefundRequestFlowProps> = ({
  orderId,
  onClose,
}) => {
  const router = useAppRouter();
  const [selectedReason, setSelectedReason] = useState('Other');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reasons = [
    { value: 'Damaged or defective', label: 'Damaged or defective' },
    { value: 'Missing parts or items', label: 'Missing parts or items' },
    { value: 'Item not as described', label: 'Item not as described' },
    { value: 'Wrong item received', label: 'Wrong item received' },
    { value: 'Other', label: 'Other' },
  ];

  const handleSubmitRefund = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await orderService.requestRefund({
        order_id: orderId,
        reason: selectedReason,
        custom_reason: customReason || undefined,
      });
      onClose();
      router.push('/user/orders/refund-requested');
    } catch (e) {
      setError('Unable to submit refund request right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="text-center space-y-2">
        <h3 className="text-base font-semibold text-gray-900">
          Why are you requesting a refund?
        </h3>
        <p className="text-sm text-gray-600">
          Please let us know the reason so we can review your request.
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
                name="refund-reason"
                className="h-4 w-4 text-deep-maroon border-gray-300 focus:ring-deep-maroon"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={() => setSelectedReason(reason.value)}
              />
              <span>{reason.label}</span>
            </label>
          ))}
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600">
            Tell us a bit more (optional)
          </label>
          <textarea
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-deep-maroon focus:border-deep-maroon"
            placeholder="e.g. Product color was completely different"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        </div>

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
            onClick={handleSubmitRefund}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-deep-maroon rounded-lg hover:bg-[#5c1022] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <FiRefreshCw className="w-4 h-4 animate-spin" />}
            Submit refund request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundRequestFlow;
