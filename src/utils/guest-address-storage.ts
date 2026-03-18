import type { AddressPayload, UserAddress } from '@/types/response/address';

export const mapUserAddressToCheckoutAddressPayload = (
  address: UserAddress,
): AddressPayload => {
  return {
    name: address.name,
    phone: address.phone,
    email: address.email,
    area: address.area ?? address.street,
    street: address.street,
    building: address.building,
    town_or_city: address.town_or_city,
    emirate_id: address.emirate_id,
    region_id: address.region_id,
    notes: address.notes,
    category: address.category,
  };
};
