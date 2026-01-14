'use client';

import ProductsList from '@/components/category/subcategory-content/products-list';
import SubcategoryFilters from '@/components/category/subcategory-filters';
import SubcategoryTopBar from '@/components/category/subcategory-top-bar';
import { useResizeWindow } from '@/hooks/use-resize-window';
import { ProductItem } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { FC, useMemo, useState } from 'react';

export interface SortOption {
  id: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'best-seller', label: 'Best seller' },
  { id: 'price-low', label: 'Price- Low to High' },
  { id: 'price-high', label: 'Price-High to Low' },
  { id: 'new-arrival', label: 'New Arrival' },
  { id: 'relevant', label: 'Relevant Products' },
  { id: 'discount', label: 'Discount' },
];

interface SubcategoryContentProps {
  products: ProductItem[];
}

// Dummy product data generator
const generateDummyProducts = (count: number): ProductItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: 'Premium Sofa Set',
    slug: `premium-sofa-set-${i + 1}`,
    description: 'Premium quality sofa set',
    category: {
      id: 1,
      name: 'Furniture',
      slug: 'furniture',
    },
    sub_category: {
      id: 1,
      name: 'Sofas',
      slug: 'sofas',
      image: '',
      description: '',
      category_name: 'Furniture',
      category_id: 1,
    },
    pricing: {
      base_price: '799',
      offer_price: '799',
      offer_percentage: '25',
      tax: null,
    },
    thumbnail_image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
    label: [],
    is_offer: true,
    average_rating: 4.5,
    is_in_wishlist: false,
  }));
};

const SubcategoryContent: FC<SubcategoryContentProps> = ({ products }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');

  // Update filter visibility on window resize
  useResizeWindow(() => {
    if (window.innerWidth < 1024) {
      setIsFilterVisible(false);
    }
  });

  // Use provided products or generate dummy ones
  const displayProducts = useMemo(
    () => (products.length > 0 ? products : generateDummyProducts(48)),
    [products]
  );

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-6">
      {/* Top Bar */}
      <SubcategoryTopBar
        productCount={displayProducts.length}
        isFilterVisible={isFilterVisible}
        onToggleFilter={handleToggleFilter}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />

      {/* Main Content */}
      <div className="flex gap-6 mt-6 border-t border-gray-200 pt-6">
        {/* Filter Sidebar - Only on lg+ screens */}
        <AnimatePresence mode="wait">
          {isFilterVisible && (
            <SubcategoryFilters
              key="filters"
              isVisible={isFilterVisible}
              onHide={handleToggleFilter}
            />
          )}
        </AnimatePresence>

        {/* Products List */}
        <ProductsList
          products={displayProducts}
          isFilterVisible={isFilterVisible}
        />
      </div>
    </div>
  );
};

export default SubcategoryContent;
