'use client';

import SubcategoryFilters, {
  FilterSection,
} from '@/components/category/subcategory-filters';
import SubcategoryTopBar from '@/components/category/subcategory-top-bar';
import { StaggerContainer } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { useResizeWindow } from '@/hooks/use-resize-window';
import { ProductItem } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';

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
  // Filter should be visible by default only on lg+ screens
  const [isFilterVisible, setIsFilterVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024; // lg breakpoint
    }
    return true; // SSR default
  });
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [filters, setFilters] = useState<Record<string, string>>({
    sort: 'best-seller',
    filter: 'best-seller',
  });

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

  // Sort options
  const sortOptions = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'best-seller', label: 'Best seller' },
    { id: 'price-low', label: 'Price- Low to High' },
    { id: 'price-high', label: 'Price-High to Low' },
    { id: 'new-arrival', label: 'New Arrival' },
    { id: 'relevant', label: 'Relevant Products' },
    { id: 'discount', label: 'Discount' },
  ];

  // Filter sections
  const filterSections: FilterSection[] = useMemo(
    () => [
      {
        id: 'sort',
        title: 'Sort by',
        options: [
          { id: 'best-seller', label: 'Best seller', value: 'best-seller' },
          {
            id: 'price-low',
            label: 'Price- Low to High',
            value: 'price-low',
          },
          {
            id: 'price-high',
            label: 'Price-High to Low',
            value: 'price-high',
          },
          { id: 'new-arrival', label: 'New Arrival', value: 'new-arrival' },
          {
            id: 'relevant',
            label: 'Relevant Products',
            value: 'relevant',
          },
          { id: 'discount', label: 'Discount', value: 'discount' },
        ],
        selectedValue: filters.sort,
        onSelect: (sectionId, value) => {
          setFilters((prev) => ({ ...prev, [sectionId]: value }));
        },
      },
      {
        id: 'filter',
        title: 'Filter',
        options: [
          { id: 'best-seller', label: 'Best seller', value: 'best-seller' },
          {
            id: 'price-low',
            label: 'Price- Low to High',
            value: 'price-low',
          },
          {
            id: 'price-high',
            label: 'Price-High to Low',
            value: 'price-high',
          },
          { id: 'new-arrival', label: 'New Arrival', value: 'new-arrival' },
        ],
        selectedValue: filters.filter,
        onSelect: (sectionId, value) => {
          setFilters((prev) => ({ ...prev, [sectionId]: value }));
        },
      },
      {
        id: 'seating-capacity',
        title: 'Seating Capacity',
        options: [
          { id: '1-seater', label: '1 seater', value: '1-seater' },
          { id: '2-seater', label: '2 seater', value: '2-seater' },
          { id: '3-seater', label: '3 seater', value: '3-seater' },
          { id: '4-seater', label: '4 seater', value: '4-seater' },
        ],
        selectedValue: filters['seating-capacity'],
        onSelect: (sectionId, value) => {
          setFilters((prev) => ({ ...prev, [sectionId]: value }));
        },
      },
      {
        id: 'leg-material',
        title: 'Leg Material',
        options: [
          { id: 'wood', label: 'Wood', value: 'wood' },
          { id: 'plastic', label: 'Plastic', value: 'plastic' },
          { id: 'metal', label: 'Metal', value: 'metal' },
        ],
        selectedValue: filters['leg-material'],
        onSelect: (sectionId, value) => {
          setFilters((prev) => ({ ...prev, [sectionId]: value }));
        },
      },
    ],
    [filters]
  );

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="container mx-auto xl:px-12 lg:px-10 md:px-6 sm:px-4 px-3 py-6">
      {/* Top Bar */}
      <SubcategoryTopBar
        isFilterVisible={isFilterVisible}
        onToggleFilter={handleToggleFilter}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />

      {/* Main Content */}
      <div className="flex mt-6 border-t border-gray-200 pt-6">
        {/* Filter Sidebar - Only on lg+ screens */}
        <AnimatePresence mode="wait">
          {isFilterVisible && (
            <SubcategoryFilters
              key="filters"
              isVisible={isFilterVisible}
              onHide={handleToggleFilter}
              sections={filterSections}
            />
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`flex-1 transition-all duration-300 ${
            isFilterVisible ? 'lg:w-3/4' : 'w-full'
          }`}
        >
          <StaggerContainer
            staggerChildren={0.05}
            delayChildren={0.1}
            className={`grid gap-x-3 gap-y-6 transition-all duration-300 ${
              // On mobile/tablet, always use 2 columns when filter is visible, 2 columns when hidden
              // On lg+, use 3 columns when filter visible, 4 columns when hidden
              isFilterVisible
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isResponsive={true}
              />
            ))}
          </StaggerContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default SubcategoryContent;
