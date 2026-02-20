export type ShippingSelection = {
  deliveryType: 'home' | 'pickup';
  isCustomDelivery: boolean;
  date: string | null;
  slotId: number | null;
  slotLabel: string | null;
  storeId: number | null;
};
