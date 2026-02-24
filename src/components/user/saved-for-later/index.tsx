'use client';

import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { ProductsListSkeleton } from '@/components/skeletons/products-list-skeleton';
import { useGetSavedItems } from '@/hooks/api';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useRef } from 'react';
import { FiBookmark } from 'react-icons/fi';

const SavedForLaterPageContent: FC = () => {
  const t = useTranslations('user.savedForLater');
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const {
    products,
    count,
    isLoadingInitialData,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useGetSavedItems();

  const isSentinelVisible = useIntersectionObserver({
    ref: sentinelRef,
    options: {
      threshold: 0,
      rootMargin: '0px 0px 200px 0px',
      enabled: hasMore,
    },
  });

  useEffect(() => {
    if (!hasMore || isLoadingMore) return;
    if (!isSentinelVisible) return;

    loadMore();
  }, [hasMore, isLoadingMore, isSentinelVisible, loadMore]);

  if (!isLoadingInitialData && !products.length) {
    return (
      <ViewOnce
        type="slideUp"
        distance={20}
        duration={0.4}
        delay={0.05}
        amount={0.01}
        margin="-40px"
        className="space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold  ">{t('title')}</h1>
          <p className="text-sm text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FiBookmark className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold   mb-2">{t('emptyTitle')}</h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            {t('emptyDescription')}
          </p>
        </div>
      </ViewOnce>
    );
  }

  return (
    <ViewOnce
      type="slideUp"
      distance={20}
      duration={0.4}
      delay={0.05}
      amount={0.01}
      margin="-40px"
      className="space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold  ">{t('title')}</h1>
        <p className="text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      {isLoadingInitialData ? (
        <ProductsListSkeleton />
      ) : (
        <>
          <StaggerContainer
            staggerChildren={0.08}
            delayChildren={0.05}
            className="grid gap-x-3 gap-y-6 grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <StaggerItem
                key={product.id}
                type="slideScale"
                direction="up"
                distance={20}
                initialScale={0.98}
                duration={0.35}
              >
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {count > 0 && (
            <div>
              <div ref={sentinelRef} className="h-px w-full" />
              {isLoadingMore && (
                <div className="mt-2">
                  <ProductsListSkeleton />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </ViewOnce>
  );
};

export default SavedForLaterPageContent;
