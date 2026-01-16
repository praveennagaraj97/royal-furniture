'use client';

import ProductsList from '@/components/category/subcategory-detail/products-list';
import SubcategoryFilters from '@/components/category/subcategory-detail/subcategory-filters';
import SubcategoryTopBar from '@/components/category/subcategory-detail/subcategory-top-bar';
import { useLayoutData } from '@/contexts/layout-context';
import { useResizeWindow } from '@/hooks/use-resize-window';
import { ProductItem } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

export interface SortOption {
  id: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { id: 'relevant', label: 'Relevant Products' },
  { id: 'best_seller', label: 'Best Seller' },
  { id: 'new_arrival', label: 'New Arrival' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'discount', label: 'Discount' },
];

interface SubcategoryDetailProps {
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

const SubcategoryDetail: FC<SubcategoryDetailProps> = ({ products }) => {
  const params = useParams();
  const { categories } = useLayoutData();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevant');

  // Get subcategory ID from layout context
  const subcategoryId = useMemo(() => {
    const categorySlug = params.category as string;
    const subcategorySlug = params.subcategory as string;
    const category = categories.find((cat) => cat.slug === categorySlug);
    const subcategory = category?.subCategories?.find(
      (sub) => sub.slug === subcategorySlug
    );
    return subcategory?.id || null;
  }, [categories, params.category, params.subcategory]);

  // Update filter visibility on window resize
  useResizeWindow(() => {
    if (window.innerWidth < 1024) {
      setIsFilterVisible(false);
    }
  });

  // Use provided products or generate dummy ones
  const rawProducts = useMemo(
    () => (products.length > 0 ? products : generateDummyProducts(48)),
    [products]
  );

  // Sort products based on selected sort option
  const displayProducts = useMemo(() => {
    const productsToSort = [...rawProducts];

    switch (selectedSort) {
      case 'price_asc':
        return productsToSort.sort((a, b) => {
          const priceA = parseFloat(
            a.pricing.offer_price || a.pricing.base_price || '0'
          );
          const priceB = parseFloat(
            b.pricing.offer_price || b.pricing.base_price || '0'
          );
          return priceA - priceB;
        });

      case 'price_desc':
        return productsToSort.sort((a, b) => {
          const priceA = parseFloat(
            a.pricing.offer_price || a.pricing.base_price || '0'
          );
          const priceB = parseFloat(
            b.pricing.offer_price || b.pricing.base_price || '0'
          );
          return priceB - priceA;
        });

      case 'new_arrival':
        // Sort by ID descending (assuming higher IDs are newer)
        // If you have a created_at or date field, use that instead
        return productsToSort.sort((a, b) => b.id - a.id);

      case 'discount':
        // Sort by discount percentage (highest discount first)
        return productsToSort.sort((a, b) => {
          const discountA = a.pricing.offer_percentage
            ? parseFloat(a.pricing.offer_percentage)
            : 0;
          const discountB = b.pricing.offer_percentage
            ? parseFloat(b.pricing.offer_percentage)
            : 0;
          return discountB - discountA;
        });

      case 'best_seller':
        // Sort by rating (highest rating first)
        // If you have a sales_count field, use that instead
        return productsToSort.sort(
          (a, b) => b.average_rating - a.average_rating
        );

      case 'relevant':
      default:
        // Keep original order (relevant/default sorting)
        return productsToSort;
    }
  }, [rawProducts, selectedSort]);

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3">
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
              subcategoryId={subcategoryId}
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

export default SubcategoryDetail;
