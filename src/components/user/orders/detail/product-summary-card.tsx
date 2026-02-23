import type { OrderDetailData, OrderListItem } from '@/types/response';
import { FC, useMemo } from 'react';
import OrderCard from '../order-card';

interface ProductSummaryCardProps {
  detail: OrderDetailData;
}

const ProductSummaryCard: FC<ProductSummaryCardProps> = ({ detail }) => {
  const syntheticListItem: OrderListItem = useMemo(
    () => ({
      id: detail.id,
      order_id: detail.order_id,
      order_header: {
        title: detail.header.delivery_label
          ? `${detail.header.delivery_label} by ${detail.header.delivery_date}`
          : `Order ${detail.order_id}`,
        subtitle: null,
      },
      status: detail.delivery_card?.status ?? 'pending',
      payment_status: 'success',
      delivery_method: detail.header.delivery_method,
      delivery_date: detail.header.delivery_date,
      item: [
        {
          product_name: detail.products[0]?.product_name ?? 'Product',
          product_image: detail.products[0]?.product_image ?? '',
          unit_price: detail.products[0]?.unit_price ?? '0',
          quantity: detail.products[0]?.quantity ?? 1,
          color: detail.products[0]?.color,
          base_price: detail.products[0]?.base_price ?? '0',
          offer_price: detail.products[0]?.offer_price ?? '0',
        },
      ],
      total_amount: String(detail.header.total_amount ?? 0),
      can_track: detail.delivery_card?.can_track ?? false,
    }),
    [detail],
  );

  return (
    <OrderCard
      disableNavigation
      order={syntheticListItem}
      showTrackButton={false}
    />
  );
};

export default ProductSummaryCard;
