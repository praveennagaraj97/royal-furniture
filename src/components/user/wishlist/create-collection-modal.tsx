'use client';

import Modal from '@/components/shared/modal';
import { useToast } from '@/contexts/toast-context';
import { wishlistService } from '@/services/api/wishlist-service';
import { FC, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateCollectionModal: FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [collectionName, setCollectionName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleDone = async () => {
    if (!collectionName.trim()) return;

    setIsSubmitting(true);
    try {
      await wishlistService.createCollection({ title: collectionName.trim() });
      setCollectionName('');
      showSuccess('Collection created successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      const parsedError = error as {
        generalError?: string;
        fieldErrors?: Record<string, string>;
      };
      const errorMessage =
        parsedError?.generalError ||
        parsedError?.fieldErrors?.title ||
        'Failed to create collection. Please try again.';
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="bottom" size="md">
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center gap-4 p-3 border-b border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-semibold  ">Create new collection</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="collection-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Collection name
              </label>
              <input
                id="collection-name"
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Collection name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-maroon focus:border-transparent transition-all"
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleDone}
            disabled={!collectionName.trim() || isSubmitting}
            className="w-full py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Done'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCollectionModal;
