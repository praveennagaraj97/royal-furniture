'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { AppLink } from '@/hooks';
import { ProductItem } from '@/types';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';

// Dummy product data
const dummyProducts: ProductItem[] = [
  {
    id: 1,
    name: 'Grey Sectional Sofa',
    slug: 'grey-sectional-sofa',
    description: 'Comfortable grey sectional sofa',
    thumbnail_image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
    pricing: {
      base_price: '2500',
      offer_price: '1875',
      offer_percentage: '25',
      tax: null,
    },
    category: {
      id: 1,
      name: 'Sofas',
      slug: 'sofas',
    },
    sub_category: {
      category_slug: 'sofas',
      id: 1,
      name: 'Sectionals',
      slug: 'sectionals',
      image: '',
      category_name: 'Sofas',
      category_id: 1,
    },
    label: [],
    is_offer: true,
    average_rating: 4.5,
    is_in_wishlist: true,
  },
  {
    id: 2,
    name: 'Beige Sofa',
    slug: 'beige-sofa',
    description: 'Elegant beige sofa',
    thumbnail_image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop',
    pricing: {
      base_price: '1800',
      offer_price: '1800',
      offer_percentage: '0',
      tax: null,
    },
    category: {
      id: 1,
      name: 'Sofas',
      slug: 'sofas',
    },
    sub_category: {
      category_slug: 'sofas',
      id: 1,
      name: 'Sectionals',
      slug: 'sectionals',
      image: '',
      category_name: 'Sofas',
      category_id: 1,
    },
    label: [],
    is_offer: false,
    average_rating: 4.3,
    is_in_wishlist: true,
  },
  {
    id: 3,
    name: 'Modern Dining Set',
    slug: 'modern-dining-set',
    description: 'Modern dining set for your home',
    thumbnail_image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=500&fit=crop',
    pricing: {
      base_price: '1200',
      offer_price: '900',
      offer_percentage: '25',
      tax: null,
    },
    category: {
      id: 2,
      name: 'Dining',
      slug: 'dining',
    },
    sub_category: {
      category_slug: 'dining',
      id: 2,
      name: 'Dining Sets',
      slug: 'dining-sets',
      image: '',
      category_name: 'Dining',
      category_id: 2,
    },
    label: [],
    is_offer: true,
    average_rating: 4.7,
    is_in_wishlist: true,
  },
  {
    id: 4,
    name: 'Coffee Table',
    slug: 'coffee-table',
    description: 'Stylish coffee table',
    thumbnail_image:
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=500&fit=crop',
    pricing: {
      base_price: '450',
      offer_price: '450',
      offer_percentage: '0',
      tax: null,
    },
    category: {
      id: 3,
      name: 'Tables',
      slug: 'tables',
    },
    sub_category: {
      category_slug: 'tables',
      id: 3,
      name: 'Coffee Tables',
      slug: 'coffee-tables',
      image: '',
      category_name: 'Tables',
      category_id: 3,
    },
    label: [],
    is_offer: false,
    average_rating: 4.2,
    is_in_wishlist: true,
  },
];

// Dummy collection data
const dummyCollections: Record<string, { name: string; itemCount: number }> = {
  '1': { name: 'My Wishlist', itemCount: 16 },
  '2': { name: 'Sofas', itemCount: 7 },
  '3': { name: 'Beds', itemCount: 6 },
};

const WishlistCollectionPageContent: FC = () => {
  const params = useParams();
  const collectionId = params.collectionId as string;
  const collection = dummyCollections[collectionId] || {
    name: 'My Wishlist',
    itemCount: 0,
  };

  return (
    <StaggerContainer
      staggerChildren={0.1}
      delayChildren={0.1}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <AppLink
          href="/user/wishlist"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-700" />
        </AppLink>
        <div className="flex items-center gap-2">
          {collection.name === 'My Wishlist' ? (
            <FiHeart className="w-6 h-6 text-deep-maroon fill-deep-maroon" />
          ) : null}
          <h1 className="text-2xl font-semibold text-gray-900">
            {collection.name}
          </h1>
        </div>
        <span className="text-sm text-gray-500 ml-auto">
          {collection.itemCount} Items
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyProducts.map((product) => (
          <StaggerItem
            key={product.id}
            type="slideUp"
            distance={20}
            duration={0.4}
          >
            <ProductCard product={product} isResponsive={true} />
          </StaggerItem>
        ))}
      </div>

      {/* Empty State (if no products) */}
      {dummyProducts.length === 0 && (
        <div className="text-center py-12">
          <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No items in this collection</p>
        </div>
      )}
    </StaggerContainer>
  );
};

export default WishlistCollectionPageContent;
