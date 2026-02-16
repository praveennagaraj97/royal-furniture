'use client';

import Modal from '@/components/shared/modal';
import { useWishlistActions } from '@/hooks/use-wishlist-actions';
import { FC, startTransition, useEffect, useState } from 'react';
import { FiArrowLeft, FiHeart, FiPlus } from 'react-icons/fi';
import CreateCollectionModal from '../../user/wishlist/create-collection-modal';

interface AddToWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  variantId: number;
  productId?: number;
  onSuccess?: () => void;
}

const AddToWishlistModal: FC<AddToWishlistModalProps> = ({
  isOpen,
  onClose,
  variantId,
  onSuccess,
}) => {
  const { collections, addToWishlist, isAdding } = useWishlistActions();
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Set default collection as selected when collections load
  useEffect(() => {
    startTransition(() => {
      if (collections.length > 0 && selectedCollectionId === null) {
        const defaultCollection = collections.find((c) => c.is_default);
        if (defaultCollection) {
          setSelectedCollectionId(defaultCollection.id);
        }
      }
    });
  }, [collections, selectedCollectionId]);

  const handleCollectionToggle = (collectionId: number) => {
    setSelectedCollectionId(collectionId);
  };

  const handleDone = async () => {
    if (!selectedCollectionId) return;

    try {
      const defaultCollection = collections.find((c) => c.is_default);
      const collectionIdToUse =
        selectedCollectionId === defaultCollection?.id
          ? undefined
          : selectedCollectionId;

      await addToWishlist(variantId, collectionIdToUse);
      onSuccess?.();
      onClose();
    } catch {
      // Error is handled in the hook with toast
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !isCreateModalOpen}
        onClose={onClose}
        variant="bottom"
        size="md"
      >
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-lg font-semibold  ">Add to Wishlist</h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Create New Collection */}
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-deep-maroon rounded-lg hover:bg-pale-blush transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center border-2 border-deep-maroon rounded-lg">
                <FiPlus className="w-6 h-6 text-deep-maroon" />
              </div>
              <span className="text-base font-medium text-deep-maroon">
                Create new collection
              </span>
            </button>

            {/* Collections List */}
            {collections.length > 0 ? (
              <div className="space-y-2">
                {collections.map((collection) => {
                  const isSelected = selectedCollectionId === collection.id;

                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => handleCollectionToggle(collection.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {/* Icon/Thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                        {collection.is_default ? (
                          <FiHeart className="w-6 h-6 text-deep-maroon fill-deep-maroon" />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300" />
                        )}
                      </div>

                      {/* Collection Info */}
                      <div className="flex-1 text-left">
                        <h3 className="text-base font-medium  ">
                          {collection.title}
                        </h3>
                      </div>

                      {/* Radio Button */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-deep-maroon border-deep-maroon'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No collections found. Create one to get started.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDone}
              disabled={!selectedCollectionId || isAdding}
              className="w-full py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? 'Adding...' : 'Done'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Create Collection Modal */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
        }}
      />
    </>
  );
};

export default AddToWishlistModal;
