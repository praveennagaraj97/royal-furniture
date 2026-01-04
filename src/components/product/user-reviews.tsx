'use client';

import { ViewOnce } from '@/components/shared/animations';
import Image from 'next/image';
import type { FC } from 'react';
import { IoIosStar } from 'react-icons/io';

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  reviewText: string;
  timestamp: string;
  productImages?: string[];
}

export interface UserReviewsProps {
  overallRating?: number;
  reviewCount?: number;
  ratingCount?: number;
  ratingDistribution?: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  reviews?: Review[];
}

export const UserReviews: FC<UserReviewsProps> = ({
  overallRating = 4.9,
  reviewCount = 156,
  ratingCount = 357,
  ratingDistribution = {
    five: 120,
    four: 25,
    three: 8,
    two: 2,
    one: 1,
  },
  reviews = [
    {
      id: '1',
      userName: 'Arthur Morgan',
      userAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      rating: 4.0,
      reviewText:
        'The product was exactly as described, and the delivery was quicker than expected. Highly satisfied!',
      timestamp: '5 days ago',
    },
    {
      id: '2',
      userName: 'Jhon Doe',
      userAvatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces',
      rating: 5.0,
      reviewText:
        'Excellent quality and great customer service. The product exceeded my expectations!',
      timestamp: '1 Week ago',
      productImages: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
      ],
    },
  ],
}) => {
  const totalRatings =
    ratingDistribution.five +
    ratingDistribution.four +
    ratingDistribution.three +
    ratingDistribution.two +
    ratingDistribution.one;

  const getBarWidth = (count: number) => {
    if (totalRatings === 0) return 0;
    const maxCount = Math.max(
      ratingDistribution.five,
      ratingDistribution.four,
      ratingDistribution.three,
      ratingDistribution.two,
      ratingDistribution.one
    );
    return (count / maxCount) * 100;
  };

  return (
    <ViewOnce
      type="slideUp"
      distance={15}
      duration={0.4}
      delay={0.55}
      amount={0.01}
      margin="-100px"
    >
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-indigo-slate">
          User Reviews
        </h2>

        {/* Overall Rating and Distribution */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start">
          {/* Overall Rating Summary */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-medium text-indigo-slate">
                {overallRating}
              </span>
              <IoIosStar className="w-7 h-7 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-900">
                {reviewCount} Reviews
              </span>
              <button
                type="button"
                className="text-sm text-indigo-slate hover:underline font-medium"
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
                  <span className="text-sm text-gray-900 w-4 shrink-0">
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
          {reviews.map((review) => (
            <div key={review.id} className="space-y-3">
              {/* Reviewer Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                  <Image
                    src={review.userAvatar}
                    alt={review.userName}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-gray-900">
                        {review.userName}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-900">
                          {review.rating}
                        </span>
                        <IoIosStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {review.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              {/* Product Images */}
              {review.productImages && review.productImages.length > 0 && (
                <div className="flex gap-2 ml-12 overflow-x-auto">
                  {review.productImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 rounded overflow-hidden bg-gray-100 shrink-0"
                    >
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ViewOnce>
  );
};
