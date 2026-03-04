'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { AppLink } from '@/hooks';
import type { ProductDetailData } from '@/types/response';
import type { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface BrowseMoreCollectionProps {
  browseMore: ProductDetailData['browse_more'];
}

export const BrowseMoreCollection: FC<BrowseMoreCollectionProps> = ({
  browseMore,
}) => {
  if (!browseMore?.category?.slug || !browseMore?.sub_category?.length) {
    return null;
  }

  return (
    <StaggerContainer
      className="mt-6"
      staggerChildren={0.08}
      delayChildren={0.1}
    >
      <StaggerItem type="slideUp" distance={20} duration={0.35}>
        <h2 className="text-2xl font-medium text-charcoal mb-4">
          Browse More Collection
        </h2>
      </StaggerItem>

      <div className="flex flex-wrap gap-3">
        {browseMore.sub_category
          .filter((item) => Boolean(item.slug))
          .map((item) => (
            <StaggerItem
              key={item.id}
              type="slideUp"
              distance={14}
              duration={0.3}
            >
              <AppLink
                href={`/${browseMore.category.slug}/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-deep-maroon px-4 py-2 text-deep-maroon font-medium text-sm sm:text-base bg-deep-maroon/5 hover:bg-deep-maroon/10 transition-colors duration-200"
              >
                <span>{item.name}</span>
                <FiChevronRight className="w-4 h-4" />
              </AppLink>
            </StaggerItem>
          ))}
      </div>
    </StaggerContainer>
  );
};
