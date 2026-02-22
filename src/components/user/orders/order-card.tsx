'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { FC, MouseEvent, useMemo } from 'react';
import {
  FiBox,
  FiCheckCircle,
  FiChevronRight,
  FiMapPin,
  FiXCircle,
} from 'react-icons/fi';
import type { OrderCardProps, OrderStatus } from './types';

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case 'expectedDelivery':
      return {
        icon: FiBox,
        textClass: 'text-[#373672]',
        iconClass: 'text-[#373672]',
      } as const;
    case 'delivered':
      return {
        icon: FiCheckCircle,
        textClass: 'text-[#00AF3B]',
        iconClass: 'text-[#00AF3B]',
      } as const;
    case 'cancelled':
      return {
        icon: FiXCircle,
        textClass: 'text-[#FF0909]',
        iconClass: 'text-[#FF0909]',
      } as const;
    case 'pickup':
    default:
      return {
        icon: FiMapPin,
        textClass: 'text-black',
        iconClass: 'text-deep-maroon',
      } as const;
  }
};

export const OrderCard: FC<OrderCardProps> = ({
  order,
  onNavigate,
  showTrackButton = true,
}) => {
  const {
    icon: StatusIcon,
    textClass,
    iconClass,
  } = getStatusConfig(order.status);

  const headerTitle = useMemo(() => {
    const dateShort = order.dateLabel.replace(/\s+\d{4}$/u, '');

    switch (order.status) {
      case 'expectedDelivery':
        return `Expected Delivery by ${dateShort}`;
      case 'delivered':
        return 'Order Delivered';
      case 'cancelled':
        return 'Order Cancelled';
      case 'pickup':
      default:
        return 'Pickup from store';
    }
  }, [order.dateLabel, order.status]);

  const secondaryText = order.timeWindow || order.dateLabel;

  const handleCardClick = () => {
    if (!onNavigate) return;
    onNavigate();
  };

  const handleTrackClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!onNavigate) return;
    onNavigate();
  };

  const handleHelpClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Prevent triggering card navigation when pressing Need help?
    event.stopPropagation();
  };

  return (
    <article
      className={`bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:border-deep-maroon/60 hover:-translate-y-0.5 group`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#F2F0FF] flex items-center justify-center shrink-0">
            <StatusIcon className={`w-6 h-6 ${iconClass}`} />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-semibold ${textClass}`}>
              {headerTitle}
            </span>
            <span className="text-[11px] text-gray-500">{secondaryText}</span>
          </div>
        </div>

        <FiChevronRight
          className={`w-5 h-5 text-deep-maroon shrink-0 transition-transform duration-200 group-hover:translate-x-0.5`}
        />
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 flex flex-col sm:flex-row gap-4 sm:items-center">
        {/* Product Info */}
        <div className="flex gap-4 flex-1">
          <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden shrink-0">
            <ResponsiveImage className="h-full w-full" />
          </div>

          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div className="space-y-1">
              <span className="inline-flex items-center rounded-md bg-deep-maroon/5 px-3 py-1 text-[11px] font-medium text-indigo-slate">
                ID #{order.id}
              </span>
              <h2 className="text-base font-semibold truncate">
                {order.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span>Colour: {order.colour}</span>
                <span>Qty: {order.quantity}</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900">
                {order.currencySymbol} {order.price}
              </span>
              {order.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {order.currencySymbol} {order.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full items-center gap-3 mt-3 sm:mt-0 sm:w-auto sm:ml-auto">
          <button
            type="button"
            onClick={handleHelpClick}
            className="inline-flex w-full flex-1 items-center justify-center px-4 py-2 rounded-lg border border-deep-maroon text-deep-maroon text-sm font-medium bg-white hover:bg-[#FFF4F4] transition-colors duration-200 whitespace-nowrap sm:w-auto sm:flex-none"
          >
            Need help?
          </button>
          {showTrackButton && (
            <button
              type="button"
              onClick={handleTrackClick}
              className="inline-flex w-full flex-1 items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:border-deep-maroon hover:text-deep-maroon transition-colors duration-200 whitespace-nowrap sm:w-auto sm:flex-none"
            >
              Track
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
