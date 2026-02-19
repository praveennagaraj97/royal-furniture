'use client';

import { ViewOnce } from '@/components/shared/animations';
import { GalleryViewerModal } from '@/components/shared/gallery-viewer';
import { UserReviewsSkeleton } from '@/components/skeletons/user-reviews-skeleton';
import { useGetReviews } from '@/hooks/api';
import { formatDateWithOrdinal } from '@/utils/date';
import Image from 'next/image';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { IoIosStar } from 'react-icons/io';

export interface UserReviewsProps {
  productSlug?: string;
}

export const UserReviews: FC<UserReviewsProps> = ({ productSlug }) => {
  const { data, isLoading } = useGetReviews({
    productSlug: productSlug ?? null,
    enabled: Boolean(productSlug),
  });

  const overallRating = data?.overall_rating ?? 0;
  const ratingDistribution = useMemo(() => {
    return {
      five: data?.ratings_breakdown?.['5'] ?? 0,
      four: data?.ratings_breakdown?.['4'] ?? 0,
      three: data?.ratings_breakdown?.['3'] ?? 0,
      two: data?.ratings_breakdown?.['2'] ?? 0,
      one: data?.ratings_breakdown?.['1'] ?? 0,
    };
  }, [data]);

  const reviews = data?.reviews?.results ?? [];

  const reviewCount = data?.reviews?.count ?? reviews.length;
  const ratingCount = Object.values(ratingDistribution).reduce(
    (a, b) => a + b,
    0,
  );

  const totalRatings =
    ratingDistribution.five +
    ratingDistribution.four +
    ratingDistribution.three +
    ratingDistribution.two +
    ratingDistribution.one;

  const getInitials = (name?: string) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) {
      // Single name -> single initial
      return parts[0][0]?.toUpperCase() || '';
    }
    // Multiple parts -> take first letters of first two words
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const getBarWidth = (count: number) => {
    if (totalRatings === 0) return 0;
    const maxCount = Math.max(
      ratingDistribution.five,
      ratingDistribution.four,
      ratingDistribution.three,
      ratingDistribution.two,
      ratingDistribution.one,
    );
    return (count / maxCount) * 100;
  };

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (images: string[], index = 0) => {
    setGalleryImages(images);
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);

  return (
    <ViewOnce
      type="slideUp"
      distance={15}
      duration={0.4}
      delay={0.55}
      amount={0.01}
      margin="-40px"
    >
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-lg md:text-xl font-semibold text-indigo-slate">
          User Reviews
        </h2>

        {isLoading ? (
          <UserReviewsSkeleton />
        ) : (
          <>
            {/* Overall Rating and Distribution */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start">
              {/* Overall Rating Summary */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-3xl md:text-4xl font-medium text-indigo-slate">
                    {overallRating}
                  </span>
                  <IoIosStar className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs md:text-sm  ">
                    {reviewCount} Reviews
                  </span>
                  <button
                    type="button"
                    className="text-xs md:text-sm text-indigo-slate hover:underline font-medium"
                  >
                    {ratingCount} ratings
                  </button>
                </div>
              </div>

              {/* Rating Distribution Chart */}
              <div className="w-full space-y-2.5 sm:border-l-2 sm:border-gray-300 sm:pl-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count =
                    stars === 5
                      ? ratingDistribution.five
                      : stars === 4
                        ? ratingDistribution.four
                        : stars === 3
                          ? ratingDistribution.three
                          : stars === 2
                            ? ratingDistribution.two
                            : ratingDistribution.one;
                  const width = getBarWidth(count);

                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs md:text-sm   w-4 shrink-0">
                        {stars}
                      </span>
                      <div className="flex-1 min-w-0 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-deep-maroon rounded-full transition-all duration-300"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => {
                const id = String(review.id);
                const userName = review.user_detail?.username ?? '';
                const userAvatar = review.user_detail?.profile_image ?? '';
                const productImages = (review.images ?? []).map(
                  (img) => img.image,
                );
                const reviewText = review.content ?? '';
                const rating = review.rating;
                const timestamp = review.created_at ?? '';

                return (
                  <div key={id} className="space-y-3">
                    {/* Reviewer Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                        {userAvatar ? (
                          <Image
                            src={userAvatar}
                            alt={userName}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-slate/10 text-indigo-slate text-sm font-medium">
                            {getInitials(userName)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs md:text-sm  ">
                              {userName}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs md:text-sm  ">
                                {rating}
                              </span>
                              <IoIosStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatDateWithOrdinal(timestamp, true)}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                          {reviewText}
                        </p>
                      </div>
                    </div>

                    {/* Product Images */}
                    {productImages && productImages.length > 0 && (
                      <div className="flex gap-2 ml-12 overflow-x-auto">
                        {productImages.map((image: string, index: number) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              openGallery(productImages || [], index)
                            }
                            className="w-20 h-20 rounded overflow-hidden bg-gray-100 shrink-0"
                          >
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <GalleryViewerModal
          images={galleryImages}
          initialIndex={galleryIndex}
          isOpen={isGalleryOpen}
          onClose={closeGallery}
        />
      </div>
    </ViewOnce>
  );
};
