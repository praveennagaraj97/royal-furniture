'use client';

import { SearchResultsSkeleton } from '@/components/skeletons/search-results-skeleton';
import { useGetSearchResults } from '@/hooks/api';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import SearchDropdown from './search-dropdown';
import SearchProductCard from './search-product-card';

const SearchBar: FC = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { results, isLoading } = useGetSearchResults({
    query: debouncedQuery,
    enabled: debouncedQuery.trim().length > 0 && isFocused,
  });

  useClickOutside({
    ref: searchRef,
    handler: () => {
      setIsDropdownOpen(false);
      setIsFocused(false);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsDropdownOpen(false);
      setIsFocused(false);
    }
  };

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = results.length > 0;
  const showEmptyState = hasQuery && !hasResults && !isLoading;
  const showSuggestions = !hasQuery || (hasQuery && isLoading);

  return (
    <div ref={searchRef} className="relative grow">
      <FiSearch className="text-[#9CA3AF] absolute left-2 rtl:left-auto rtl:right-2 top-3 w-6 h-6 z-10" />
      <input
        type="text"
        placeholder={t('searchPlaceholder')}
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        className="bg-[#F9FAFB] lg:py-3 py-2 w-full rounded-xl placeholder:text-[#9CA3AF] pl-9 rtl:pl-0 rtl:pr-9 border
        hover:border-gray-400/60 focus:border-gray-400/60 focus:outline-none
        transition-colors duration-150 delay-75 border-gray-100"
        suppressHydrationWarning
      />

      {/* Search Dropdown */}
      <AnimatePresence mode="wait">
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {showSuggestions ? (
              <SearchDropdown isOpen={true} searchQuery={searchQuery} />
            ) : showEmptyState ? (
              <div
                className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Search Results
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-12 px-4"
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                        <FiSearch className="w-10 h-10 text-gray-400" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">?</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-sm mb-4">
                      We couldn&apos;t find any products matching &quot;
                      {debouncedQuery}&quot;. Try different keywords or browse
                      our categories.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setIsDropdownOpen(false);
                      }}
                      className="text-sm text-deep-maroon hover:text-deep-maroon/80 font-medium transition-colors"
                    >
                      Clear search
                    </button>
                  </motion.div>
                </div>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <SearchResultsSkeleton />
                ) : (
                  <div
                    className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-4">
                        Search Results
                      </h3>
                      {results.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {results.map((product, index) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                                ease: 'easeOut',
                              }}
                            >
                              <SearchProductCard product={product} />
                            </motion.div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
