'use client';

import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { OrdersListSkeleton } from '@/components/skeletons/orders-list-skeleton';
import { useAppRouter } from '@/hooks';
import { useGetOrders } from '@/hooks/api';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { FC, useEffect, useRef } from 'react';
import { FiBox } from 'react-icons/fi';
import OrderCard from './order-card';

const OrdersPageContent: FC = () => {
  const router = useAppRouter();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const {
    orders,
    count,
    isLoadingInitialData,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useGetOrders();

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

  if (!isLoadingInitialData && !orders.length) {
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
          <h1 className="text-2xl font-semibold  ">My Orders</h1>
          <p className="text-sm text-gray-500">
            View and manage all your recent purchases in one place.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FiBox className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold   mb-2">No orders yet</h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Once you place an order, you&apos;ll be able to track it here.
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
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold  ">My Orders</h1>
        <p className="text-sm text-gray-500">
          View and manage all your recent purchases in one place.
        </p>
      </div>
      {isLoadingInitialData ? (
        <OrdersListSkeleton />
      ) : (
        <>
          {/* Orders List with page-level stagger */}
          <div className="space-y-4">
            {Array.from(
              { length: Math.ceil(orders.length / 3) },
              (_, pageIndex) => {
                const start = pageIndex * 3;
                const end = start + 3;
                const pageOrders = orders.slice(start, end);

                return (
                  <StaggerContainer
                    key={pageIndex}
                    mode="animate"
                    staggerChildren={0.08}
                    delayChildren={0.05}
                    className="space-y-4"
                  >
                    {pageOrders.map((order) => (
                      <StaggerItem
                        key={order.id}
                        type="slideScale"
                        direction="up"
                        distance={20}
                        initialScale={0.98}
                        duration={0.35}
                      >
                        <OrderCard
                          order={order}
                          showTrackButton={order.can_track}
                          onNavigate={() =>
                            router.push(`/user/orders/${order.id}`)
                          }
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                );
              },
            )}
          </div>

          {/* Infinite scroll sentinel + loading skeleton */}
          {count > 0 && (
            <div>
              <div ref={sentinelRef} className="h-px w-full" />
              {isLoadingMore && (
                <div className="mt-2">
                  <OrdersListSkeleton />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </ViewOnce>
  );
};

export default OrdersPageContent;
