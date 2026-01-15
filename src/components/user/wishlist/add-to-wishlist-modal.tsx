'use client';

import Modal from '@/components/shared/modal';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiArrowLeft, FiCheck, FiHeart, FiPlus } from 'react-icons/fi';
import CreateCollectionModal from './create-collection-modal';

interface AddToWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

// Dummy collections data
const dummyCollections = [
  {
    id: '1',
    name: 'My Wishlist',
    itemCount: 2,
    icon: 'heart',
    isSelected: true,
  },
  {
    id: '2',
    name: 'Sofas',
    itemCount: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    isSelected: false,
  },
  {
    id: '3',
    name: 'Beds',
    itemCount: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100&h=100&fit=crop',
    isSelected: false,
  },
];

const AddToWishlistModal: FC<AddToWishlistModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    dummyCollections.filter((c) => c.isSelected).map((c) => c.id)
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCollectionToggle = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleDone = () => {
    // TODO: Wire API call here
    onClose();
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
            <h2 className="text-lg font-semibold text-gray-900">
              Add to Wishlist
            </h2>
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
            <div className="space-y-2">
              {dummyCollections.map((collection) => {
                const isSelected = selectedCollections.includes(collection.id);
                return (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => handleCollectionToggle(collection.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {/* Icon/Thumbnail */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                      {collection.icon === 'heart' ? (
                        <FiHeart className="w-6 h-6 text-deep-maroon fill-deep-maroon" />
                      ) : (
                        <Image
                          src={
                            collection.thumbnail ||
                            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop'
                          }
                          alt={collection.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Collection Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-base font-medium text-gray-900">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {collection.itemCount} Items
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-deep-maroon border-deep-maroon'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <FiCheck className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDone}
              className="w-full py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-colors"
            >
              Done
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
          // Optionally refresh collections list
        }}
      />
    </>
  );
};

export default AddToWishlistModal;
