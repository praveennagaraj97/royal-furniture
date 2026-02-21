'use client';

import Modal from '@/components/shared/modal';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { useWishlistActions } from '@/hooks/use-wishlist-actions';
import { useTranslations } from 'next-intl';
import { FC, startTransition, useEffect, useState } from 'react';
import { FiHeart, FiPlus } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
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
  const t = useTranslations('product.wishlist');
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
          <div className="flex items-center justify-between gap-4 p-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold  ">{t('title')}</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 bg-deep-maroon hover:bg-deep-maroon/90 rounded-full transition-colors"
            >
              <IoClose className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Create New Collection */}
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full flex items-center gap-3 p-2"
            >
              <div className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-deep-maroon rounded-lg">
                <FiPlus className="w-6 h-6 text-deep-maroon" />
              </div>
              <span className="font-semibold text-indigo-slate">
                {t('createNew')}
              </span>
            </button>

            {/* Collections List */}
            {collections.length > 0 ? (
              <div className="space-y-2">
                {collections.map((collection) => {
                  const isSelected = selectedCollectionId === collection.id;

                  const hasPreview =
                    collection.preview_items &&
                    collection.preview_items.length > 0;
                  const preview = hasPreview
                    ? collection.preview_items[0]
                    : null;
                  const src =
                    preview?.responsive_images?.mobile?.url ||
                    preview?.product_image ||
                    null;

                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => handleCollectionToggle(collection.id)}
                      className={`${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'} w-full flex items-center gap-3 p-3 rounded-lg transition-colors`}
                    >
                      {/* Icon/Thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                        {src ? (
                          <ResponsiveImage
                            images={{
                              web: { url: src },
                              ipad: { url: src },
                              mobile: { url: src },
                            }}
                            alt={preview?.product_name || collection.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiHeart className="w-6 h-6 text-deep-maroon fill-deep-maroon" />
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
                {t('empty')}
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
              {isAdding ? t('adding') : t('done')}
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
