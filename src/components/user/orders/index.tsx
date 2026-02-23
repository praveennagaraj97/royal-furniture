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
          {/* Orders List */}
          <StaggerContainer
            staggerChildren={0.08}
            delayChildren={0.05}
            className="space-y-4"
          >
            {orders.map((order) => {
              return (
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
                    onNavigate={() => router.push(`/user/orders/${order.id}`)}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Infinite scroll sentinel + summary */}
          {count > 0 && (
            <div className="mt-4 flex flex-col items-center gap-2 text-sm text-gray-600">
              <div
                ref={sentinelRef}
                className="h-8 w-full flex items-center justify-center"
              >
                {isLoadingMore && <span>Loading more…</span>}
              </div>
            </div>
          )}
        </>
      )}
    </ViewOnce>
  );
};

export default OrdersPageContent;
