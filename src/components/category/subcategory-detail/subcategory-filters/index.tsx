'use client';

import { ViewOnce } from '@/components/shared/animations';
import Portal from '@/components/shared/portal';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface SubcategoryFiltersProps {
  isVisible: boolean;
  onHide: () => void;
}

// Static filter sections
const FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'sort',
    title: 'Sort by',
    options: [
      { id: 'best-seller', label: 'Best seller', value: 'best-seller' },
      { id: 'price-low', label: 'Price- Low to High', value: 'price-low' },
      { id: 'price-high', label: 'Price-High to Low', value: 'price-high' },
      { id: 'new-arrival', label: 'New Arrival', value: 'new-arrival' },
      { id: 'relevant', label: 'Relevant Products', value: 'relevant' },
      { id: 'discount', label: 'Discount', value: 'discount' },
    ],
  },
  {
    id: 'filter',
    title: 'Filter',
    options: [
      { id: 'best-seller', label: 'Best seller', value: 'best-seller' },
      { id: 'price-low', label: 'Price- Low to High', value: 'price-low' },
      { id: 'price-high', label: 'Price-High to Low', value: 'price-high' },
      { id: 'new-arrival', label: 'New Arrival', value: 'new-arrival' },
    ],
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
  },
  {
    id: 'leg-material',
    title: 'Leg Material',
    options: [
      { id: 'wood', label: 'Wood', value: 'wood' },
      { id: 'plastic', label: 'Plastic', value: 'plastic' },
      { id: 'metal', label: 'Metal', value: 'metal' },
    ],
  },
];

const SubcategoryFilters: FC<SubcategoryFiltersProps> = ({
  isVisible,
  onHide,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({
    sort: 'best-seller',
    filter: 'best-seller',
  });

  const handleFilterChange = (sectionId: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [sectionId]: value }));
  };

  const filterContent = useMemo(
    () => (
      <div className="space-y-6 min-w-0 w-full lg:pr-4">
        {/* Filter Sections */}
        {FILTER_SECTIONS.map((section, index) => (
          <ViewOnce
            key={section.id}
            type="slideUp"
            distance={15}
            duration={0.4}
            delay={0.1 + index * 0.05}
            className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
          >
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                {section.id === 'sort' ? (
                  <BiSortAlt2 className="w-4 h-4 text-deep-maroon" />
                ) : (
                  <span className="text-deep-maroon">✓</span>
                )}
                {section.title}
              </h3>
              <div className="space-y-2.5">
                {section.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2.5 cursor-pointer group justify-between min-w-0"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate flex-1 min-w-0">
                      {option.label}
                    </span>

                    <input
                      type="radio"
                      name={section.id}
                      value={option.value}
                      checked={selectedFilters[section.id] === option.value}
                      onChange={() =>
                        handleFilterChange(section.id, option.value)
                      }
                      className="w-4 h-4 text-deep-maroon border-gray-300 focus:ring-deep-maroon focus:ring-2 cursor-pointer accent-deep-maroon shrink-0"
                    />
                  </label>
                ))}
              </div>
            </div>
          </ViewOnce>
        ))}
      </div>
    ),
    [selectedFilters]
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Sidebar (lg+) */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="hidden lg:block w-1/4 pr-4"
      >
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden">
          {filterContent}
        </div>
      </motion.aside>

      {/* Mobile/Tablet Bottom Sheet */}
      <Portal>
        <AnimatePresence>
          {isVisible && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/30 z-50 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onHide}
              />

              {/* Bottom Sheet Panel */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden shadow-2xl rounded-t-2xl overflow-hidden max-h-[85vh] flex flex-col"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 shrink-0">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={onHide}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close filters"
                  >
                    <FiX className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Filter Content - Scrollable */}
                <div className="overflow-y-auto flex-1 px-4 py-4">
                  {filterContent}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default SubcategoryFilters;
