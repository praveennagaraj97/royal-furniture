'use client';

import { ViewOnce } from '@/components/shared/animations';
import { WishlistCollectionsSkeleton } from '@/components/skeletons/wishlist-collections-skeleton';
import { useGetWishlistCollections } from '@/hooks/api';
import { FC, useState } from 'react';
import { FiHeart, FiPlus } from 'react-icons/fi';
import CreateCollectionModal from './create-collection-modal';
import WishlistCollectionCard from './wishlist-collection-card';

const WishlistPageContent: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { collections, isLoading, mutate } = useGetWishlistCollections();

  const handleCollectionCreated = () => {
    mutate(); // Refresh collections after creating
  };

  return (
    <>
      <ViewOnce
        type="slideUp"
        distance={20}
        duration={0.4}
        delay={0.05}
        amount={0.01}
        margin="-40px"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-semibold  ">Wishlist</h1>

          {/* Create New Collection Button */}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiPlus className="w-5 h-5" />
            <span>Create new collection</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <WishlistCollectionsSkeleton />
        ) : collections.length > 0 ? (
          <>
            {/* Collections Grid */}
            <div
              key={`${isLoading}-${collections.length}`}
              className="grid grid-cols-1 gap-6"
            >
              {collections.map((collection) => (
                <WishlistCollectionCard
                  key={collection.id}
                  collection={collection}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiHeart className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold   mb-2">
                No collections yet
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
                Start organizing your favorite products by creating your first
                wishlist collection.
              </p>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FiPlus className="w-5 h-5" />
                <span>Create new collection</span>
              </button>
            </div>
          </>
        )}
      </ViewOnce>

      {/* Create Collection Modal */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCollectionCreated}
      />
    </>
  );
};

export default WishlistPageContent;
