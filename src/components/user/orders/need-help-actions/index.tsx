'use client';

import Modal from '@/components/shared/modal';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, startTransition, useEffect, useState } from 'react';
import { FiHelpCircle, FiPhoneCall, FiRefreshCw } from 'react-icons/fi';
import CancelOrderFlow from './cancel-order-flow';
import RefundRequestFlow from './refund-request-flow';

export type NeedHelpStep = 'options' | 'cancel-reason' | 'refund-reason';

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderUuid?: string;
  orderCode?: string;
  onContactUs?: () => void;
  initialStep?: NeedHelpStep;
}

const NeedHelpModal: FC<NeedHelpModalProps> = ({
  isOpen,
  onClose,
  orderUuid,
  orderCode,
  onContactUs,
  initialStep = 'options',
}) => {
  const [step, setStep] = useState<NeedHelpStep>(initialStep);

  useEffect(() => {
    startTransition(() => {
      if (!isOpen) {
        setStep(initialStep);
      }
    });
  }, [isOpen, initialStep]);

  const handleClose = () => {
    onClose();
    setStep(initialStep);
  };

  const renderContent = () => {
    if (!orderUuid) return null;

    if (step === 'cancel-reason') {
      return <CancelOrderFlow orderId={orderUuid} onClose={handleClose} />;
    }

    if (step === 'refund-reason') {
      return <RefundRequestFlow orderId={orderUuid} onClose={handleClose} />;
    }

    return (
      <div className="p-6 space-y-5">
        <div className="flex justify-center">
          <div className="rounded-full bg-[#F4F4FF] p-3 text-deep-maroon">
            <FiHelpCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-base font-semibold text-gray-900">
            Need help with this order?
          </h3>
          <p className="text-sm text-gray-600">
            You can cancel this order, request a refund, or contact our support
            team if you have any questions.
          </p>
          <p className="text-xs text-gray-400">
            Order ID: #{orderCode ?? orderUuid}
          </p>
        </div>
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={() => setStep('cancel-reason')}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-deep-maroon rounded-lg hover:bg-[#5c1022] transition-colors duration-200"
          >
            Cancel this order
          </button>
          <button
            type="button"
            onClick={() => setStep('refund-reason')}
            className="w-full px-4 py-2.5 text-sm font-medium text-deep-maroon bg-[#FFF5F4] rounded-lg hover:bg-[#FFE6E2] transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            Request refund
          </button>
          <button
            type="button"
            onClick={onContactUs ?? handleClose}
            className="w-full px-4 py-2.5 text-sm font-medium text-deep-maroon bg-[#F4F4FF] rounded-lg hover:bg-[#E5E5FF] transition-colors duration-200 inline-flex items-center justify-center gap-2"
          >
            <FiPhoneCall className="w-4 h-4" />
            Contact us
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} variant="bottom" size="sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default NeedHelpModal;
