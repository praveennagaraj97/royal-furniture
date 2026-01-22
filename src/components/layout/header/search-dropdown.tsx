'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { SearchDropdownSkeleton } from '@/components/skeletons/search-dropdown-skeleton';
import { AppLink } from '@/hooks';
import { useGetSearchSuggestions } from '@/hooks/api';
import { FC } from 'react';
import { FiChevronRight, FiZap } from 'react-icons/fi';
import SearchProductCard from './search-product-card';

interface SearchDropdownProps {
  isOpen: boolean;
  searchQuery: string;
  onItemClick?: () => void;
}

const SearchDropdown: FC<SearchDropdownProps> = ({ isOpen, onItemClick }) => {
  const {
    popularSearches,
    mostSearchedProducts,
    trendingCategories,
    isLoading,
  } = useGetSearchSuggestions();

  if (!isOpen) return null;

  if (isLoading) {
    return <SearchDropdownSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
      <StaggerContainer
        staggerChildren={0.05}
        delayChildren={0.1}
        mode="animate"
        className="p-4 space-y-6"
      >
        {/* Popular Searches Section */}
        {popularSearches.length > 0 && (
          <StaggerItem type="slideUp" distance={10} duration={0.3}>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <StaggerItem
                    key={search.id}
                    type="slideScale"
                    direction="up"
                    distance={5}
                    initialScale={0.9}
                    duration={0.2}
                  >
                    <AppLink
                      href={`/search?q=${encodeURIComponent(
                        search.search_term,
                      )}`}
                      onClick={onItemClick}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {search.search_term.toLowerCase().includes('flash') && (
                        <FiZap className="w-4 h-4 text-yellow-500" />
                      )}
                      <span>{search.search_term}</span>
                    </AppLink>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerItem>
        )}

        {/* Most Searched Products Section */}
        {mostSearchedProducts.length > 0 && (
          <StaggerItem type="slideUp" distance={10} duration={0.3}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">
                  Most searched products
                </h3>
                <AppLink
                  href="/search"
                  onClick={onItemClick}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <span>See all</span>
                  <FiChevronRight className="w-4 h-4 rtl:rotate-180" />
                </AppLink>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {mostSearchedProducts.map((product) => (
                  <StaggerItem
                    key={product.id}
                    type="slideUp"
                    distance={10}
                    duration={0.3}
                  >
                    <div onClick={onItemClick}>
                      <SearchProductCard product={product} />
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerItem>
        )}

        {/* Trending Products Section */}
        {trendingCategories && trendingCategories.length > 0 && (
          <StaggerItem type="slideUp" distance={10} duration={0.3}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">
                  Trending Products
                </h3>
                <AppLink
                  href="/categories"
                  onClick={onItemClick}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <span>See all</span>
                  <FiChevronRight className="w-4 h-4 rtl:rotate-180" />
                </AppLink>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {trendingCategories.map((category) => (
                  <div key={category.id} className="w-full">
                    <StaggerItem
                      type="slideUp"
                      distance={10}
                      duration={0.3}
                      className="w-full"
                    >
                      <AppLink
                        href={`/search?q=${encodeURIComponent(category.name)}`}
                        onClick={onItemClick}
                        className="group relative block w-full aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-md transition-shadow"
                      >
                        <ResponsiveImage
                          images={category.responsive_images}
                          alt={category.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <h4 className="text-white font-medium text-xs text-center">
                            {category.name}
                          </h4>
                        </div>
                      </AppLink>
                    </StaggerItem>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
        )}
      </StaggerContainer>
    </div>
  );
};

export default SearchDropdown;
