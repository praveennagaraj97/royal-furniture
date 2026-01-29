'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { AppLink, useClickOutside } from '@/hooks';
import { SubCategoryItem } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useRef } from 'react';

interface CategoryDropdownProps {
  categoryName: string;
  categorySlug: string;
  subcategories: SubCategoryItem[];
  isOpen: boolean;
  onClose: () => void;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  categoryName,
  categorySlug,
  subcategories,
  isOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: dropdownRef,
    handler() {
      onClose();
    },
    enabled: isOpen,
  });

  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          key="dropdown"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-visible z-50 rounded-b-lg"
        >
          {/* Invisible bridge area to prevent gap when moving mouse */}
          <div className="h-2 -mt-2 bg-transparent" />
          <div className="section-container pt-6 pb-8">
            {/* Category Header */}
            <div className="mb-6">
              <AppLink
                href={`/${categorySlug}`}
                className="text-xl font-bold text-gray-900 hover:text-deep-maroon transition-colors inline-block"
              >
                {categoryName}
              </AppLink>
            </div>

            {/* Subcategories Grid */}
            <StaggerContainer
              mode="animate"
              staggerChildren={0.05}
              delayChildren={0}
              duration={0.3}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {subcategories.map((subcategory) => (
                <StaggerItem
                  key={subcategory.id}
                  type="slide"
                  direction="down"
                  distance={10}
                  duration={0.3}
                  className="shrink-0"
                >
                  <AppLink
                    href={
                      subcategory.slug
                        ? `/${categorySlug}/${subcategory.slug}`
                        : `/${categorySlug}`
                    }
                    className="group flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <ResponsiveImage
                        images={subcategory.responsive_images}
                        alt={subcategory.name}
                        className="group-hover:scale-105 aspect-square transition-transform duration-300"
                        shouldFill={true}
                        objectFit="cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 text-center group-hover:text-deep-maroon transition-colors line-clamp-2">
                      {subcategory.name}
                    </span>
                  </AppLink>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryDropdown;
