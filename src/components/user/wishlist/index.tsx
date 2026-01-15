'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { FC, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import CreateCollectionModal from './create-collection-modal';
import WishlistCollectionCard from './wishlist-collection-card';

// Dummy data for wishlist collections
const dummyCollections = [
  {
    id: '1',
    name: 'My Wishlist',
    itemCount: 16,
    thumbnail:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
    products: [
      {
        id: '1',
        thumbnail:
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        name: 'Grey Sectional Sofa',
      },
      {
        id: '2',
        thumbnail:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
        name: 'Beige Sofa',
      },
      {
        id: '3',
        thumbnail:
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop',
        name: 'Dining Set',
      },
      {
        id: '4',
        thumbnail:
          'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=200&h=200&fit=crop',
        name: 'Coffee Table',
      },
    ],
  },
  {
    id: '2',
    name: 'Sofas',
    itemCount: 7,
    thumbnail:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
    products: [
      {
        id: '5',
        thumbnail:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
        name: 'White Sofa',
      },
      {
        id: '6',
        thumbnail:
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        name: 'Grey Sofa',
      },
      {
        id: '7',
        thumbnail:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
        name: 'Beige Sofa',
      },
      {
        id: '8',
        thumbnail:
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        name: 'Modern Sofa',
      },
    ],
  },
  {
    id: '3',
    name: 'Beds',
    itemCount: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop',
    products: [
      {
        id: '9',
        thumbnail:
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
        name: 'Teddy Bear Bed',
      },
      {
        id: '10',
        thumbnail:
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
        name: 'Bunny Bed',
      },
      {
        id: '11',
        thumbnail:
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
        name: 'Minimalist Bed',
      },
      {
        id: '12',
        thumbnail:
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
        name: 'Modern Bed',
      },
    ],
  },
];

const WishlistPageContent: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <StaggerContainer
        staggerChildren={0.1}
        delayChildren={0.1}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Wishlist</h1>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 gap-4">
          {dummyCollections.map((collection) => (
            <StaggerItem
              key={collection.id}
              type="slideUp"
              distance={20}
              duration={0.4}
            >
              <WishlistCollectionCard collection={collection} />
            </StaggerItem>
          ))}
        </div>

        {/* Create New Collection Button */}
        <StaggerItem type="slideUp" distance={20} duration={0.4}>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiPlus className="w-5 h-5" />
            <span>Create new collection</span>
          </button>
        </StaggerItem>
      </StaggerContainer>

      {/* Create Collection Modal */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default WishlistPageContent;
