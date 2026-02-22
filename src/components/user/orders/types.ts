export type OrderStatus =
  | 'expectedDelivery'
  | 'delivered'
  | 'cancelled'
  | 'pickup';

export interface OrderListItem {
  id: string;
  status: OrderStatus;
  dateLabel: string;
  timeWindow?: string;
  title: string;
  colour: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  currencySymbol: string;
}

export interface OrderCardProps {
  order: OrderListItem;
}
