import { FC } from 'react';
import OrderCard from '../order-card';
import type { OrderListItem } from '../types';

interface ProductSummaryCardProps {
  order: OrderListItem;
}

const ProductSummaryCard: FC<ProductSummaryCardProps> = ({ order }) => {
  return <OrderCard order={order} showTrackButton={false} />;
};

export default ProductSummaryCard;
