'use client';

import Modal from '@/components/shared/modal';
import { type FC } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'warning' | 'danger' | 'info';
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const iconClass = `confirmation-modal-icon-${variant}`;
  const iconBgClass = `confirmation-modal-icon-bg-${variant}`;
  const buttonClass = `confirmation-modal-button-${variant}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="bottom"
      size="sm"
      className="sm:max-w-md"
      preventClose={true}
    >
      <div className="p-6">
        {/* Icon at top */}
        <div className="flex justify-center mb-4">
          <div className={`${iconBgClass} rounded-full p-3`}>
            <FiAlertTriangle className={`w-6 h-6 ${iconClass}`} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold   mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{message}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${buttonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
