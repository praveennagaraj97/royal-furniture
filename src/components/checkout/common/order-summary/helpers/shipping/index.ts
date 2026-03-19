import type { UserAddress } from '@/types/response/address';
import type {
  ShippingSelection,
  ShippingSubmitGuestAddressPayload,
} from '@/types/response/cart';

export const buildGuestAddressPayload = (
  address?: UserAddress | null,
): ShippingSubmitGuestAddressPayload => {
  if (!address) {
    return {};
  }

  return {
    name: address.name,
    email: address.email,
    phone: address.phone,
    area: address.area,
    street: address.street,
    building: address.building,
    town_or_city: address.town_or_city,
    emirate_id: address.emirate_id,
    region_id: address.region_id,
    notes: address.notes,
    category: address.category,
  };
};

export const isHomeShippingSelectionIncomplete = (
  shippingSelection: ShippingSelection,
): boolean => {
  return (
    !shippingSelection.addressId ||
    (shippingSelection.isCustomDelivery &&
      (!shippingSelection.date || !shippingSelection.slotId))
  );
};

export const isPickupShippingSelectionIncomplete = (
  shippingSelection: ShippingSelection,
): boolean => {
  return (
    !shippingSelection.storeId ||
    !shippingSelection.pickupDate ||
    !shippingSelection.pickupSlotId
  );
};
