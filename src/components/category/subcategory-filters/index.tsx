'use client';

import { ViewOnce } from '@/components/shared/animations';
import Portal from '@/components/shared/portal';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  selectedValue?: string;
  onSelect: (sectionId: string, value: string) => void;
}

interface SubcategoryFiltersProps {
  isVisible: boolean;
  onHide: () => void;
  sections: FilterSection[];
}

const SubcategoryFilters: FC<SubcategoryFiltersProps> = ({
  isVisible,
  onHide,
  sections,
}) => {
  const filterContent = useMemo(
    () => (
      <div className="bg-white rounded-lg space-y-6 max-h-[calc(100vh-38px)] overflow-y-auto min-w-72 pr-6">
        {/* Filter Sections */}
        {sections.map((section, index) => (
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
                    className="flex items-center gap-2.5 cursor-pointer group justify-between space-x-6"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {option.label}
                    </span>

                    <input
                      type="radio"
                      name={section.id}
                      value={option.value}
                      checked={section.selectedValue === option.value}
                      onChange={() =>
                        section.onSelect(section.id, option.value)
                      }
                      className="w-4 h-4 text-deep-maroon border-gray-300 focus:ring-deep-maroon focus:ring-2 cursor-pointer accent-deep-maroon"
                    />
                  </label>
                ))}
              </div>
            </div>
          </ViewOnce>
        ))}
      </div>
    ),
    [sections]
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
        className="hidden lg:block  pr-4"
      >
        <div className="sticky top-24">{filterContent}</div>
      </motion.aside>

      {/* Mobile/Tablet Drawer */}
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

              {/* Drawer Panel */}
              <motion.div
                className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-xl overflow-y-auto"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="p-4">
                  {/* Close Button */}
                  <div className="flex justify-between items-center mb-4">
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

                  {/* Filter Content */}
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
