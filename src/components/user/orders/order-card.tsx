'use client';

import ResponsiveImage from '@/components/shared/ui/responsive-image';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import type { OrderListItem } from '@/types/response';
import { formatDateWithOrdinal } from '@/utils/date';
import { FC, MouseEvent, useMemo } from 'react';
import {
  FiBox,
  FiCheckCircle,
  FiChevronRight,
  FiXCircle,
} from 'react-icons/fi';

export interface OrderCardProps {
  order: OrderListItem;
  onNavigate?: () => void;
  showTrackButton?: boolean;
}

type OrderStatus = OrderListItem['status'];

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case 'delivered':
      return {
        icon: FiCheckCircle,
        textClass: 'text-[#00AF3B]',
        iconClass: 'text-[#00AF3B]',
      } as const;
    case 'failed':
      return {
        icon: FiXCircle,
        textClass: 'text-[#FF0909]',
        iconClass: 'text-[#FF0909]',
      } as const;
    case 'pending':
    default:
      return {
        icon: FiBox,
        textClass: 'text-[#373672]',
        iconClass: 'text-[#373672]',
      } as const;
  }
};

export const OrderCard: FC<OrderCardProps> = ({
  order,
  onNavigate,
  showTrackButton = true,
}) => {
  const formatCurrency = useFormatCurrency();

  const {
    icon: StatusIcon,
    textClass,
    iconClass,
  } = getStatusConfig(order.status as OrderStatus);

  const primaryItem = order.item[0];

  const headerTitle = useMemo(() => {
    return order.order_header?.title || '';
  }, [order.order_header]);

  const secondaryText = useMemo(() => {
    return formatDateWithOrdinal(order.delivery_date);
  }, [order.delivery_date]);

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
                # {order.order_id}
              </span>
              <h2 className="text-base font-semibold truncate">
                {primaryItem?.product_name || 'Order item'}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                {primaryItem?.color && (
                  <span>
                    Colour{' '}
                    {primaryItem.color.name_en ||
                      primaryItem.color.name ||
                      primaryItem.color.name_ar ||
                      '—'}
                  </span>
                )}
                {primaryItem && <span>Qty: {primaryItem.quantity}</span>}
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900">
                {formatCurrency(order.total_amount)}
              </span>
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
