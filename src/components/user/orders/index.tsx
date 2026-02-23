'use client';

import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import { OrdersListSkeleton } from '@/components/skeletons/orders-list-skeleton';
import { useAppRouter } from '@/hooks';
import { useGetOrders } from '@/hooks/api';
import { FC, useMemo, useState } from 'react';
import { FiBox } from 'react-icons/fi';
import OrderCard from './order-card';

const OrdersPageContent: FC = () => {
  const router = useAppRouter();
  const [page, setPage] = useState(1);
  const { orders, count, next, previous, isLoading } = useGetOrders({ page });

  const { start, end } = useMemo(() => {
    if (!orders.length || count === 0) {
      return { start: 0, end: 0 };
    }
    const pageSize = orders.length;
    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = startIndex + pageSize - 1;
    return { start: startIndex, end: Math.min(endIndex, count) };
  }, [orders.length, count, page]);

  const handleNextPage = () => {
    if (!next) return;
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (!previous || page <= 1) return;
    setPage((prev) => Math.max(1, prev - 1));
  };

  if (!isLoading && !orders.length) {
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
          <button
            type="button"
            className="px-6 py-3 bg-deep-maroon text-white rounded-lg font-medium hover:bg-deep-maroon/90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Start Shopping
          </button>
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
      {isLoading ? (
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
                    onNavigate={() =>
                      router.push(`/user/orders/${order.order_id}`)
                    }
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Pagination */}
          {count > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
              <div>
                {start > 0 && end > 0 && (
                  <span>
                    Showing {start}–{end} of {count} orders
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={!previous || page <= 1}
                  className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border-gray-300 bg-white text-gray-700 hover:border-deep-maroon hover:text-deep-maroon transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={!next}
                  className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border-gray-300 bg-white text-gray-700 hover:border-deep-maroon hover:text-deep-maroon transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </ViewOnce>
  );
};

export default OrdersPageContent;
