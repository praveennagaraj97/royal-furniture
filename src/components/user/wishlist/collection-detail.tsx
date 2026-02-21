'use client';

import { ViewOnce } from '@/components/shared/animations';
import ProductCard from '@/components/shared/ui/product-listing/product-card';
import { AppLink } from '@/hooks';
import { useGetWishlistCollection } from '@/hooks/api';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';

const WishlistCollectionPageContent: FC = () => {
  const t = useTranslations('user.wishlist');
  const params = useParams();
  const collectionId = params.collectionId as string | undefined;

  const { collection, isLoading } = useGetWishlistCollection(collectionId);

  const title = collection?.title || t('collectionTitleDefault');
  const totalItems = collection?.total_items ?? 0;
  const products = collection?.items?.map((i) => i.product) || [];

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
      {/* Header */}
      <div className="flex items-center gap-4">
        <AppLink
          href="/user/wishlist"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-700" />
        </AppLink>
        <div className="flex items-center gap-2">
          {title === 'My Wishlist' ? (
            <FiHeart className="w-6 h-6 text-deep-maroon fill-deep-maroon" />
          ) : null}
          <h1 className="text-2xl font-semibold  ">{title}</h1>
        </div>
        <span className="text-sm text-gray-500 ml-auto">
          {t('itemCount', { count: totalItems })}
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-48 bg-gray-100 animate-pulse rounded"
              />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Empty State (if no products) */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t('collectionEmpty')}</p>
        </div>
      )}
    </ViewOnce>
  );
};

export default WishlistCollectionPageContent;
