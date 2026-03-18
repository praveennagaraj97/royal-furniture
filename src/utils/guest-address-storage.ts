import type { AddressPayload, UserAddress } from '@/types/response/address';

const GUEST_ADDRESSES_STORAGE_KEY = 'royal_furniture_guest_addresses';

const readGuestAddresses = (): UserAddress[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(GUEST_ADDRESSES_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as UserAddress[]) : [];
  } catch {
    return [];
  }
};

const writeGuestAddresses = (addresses: UserAddress[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    GUEST_ADDRESSES_STORAGE_KEY,
    JSON.stringify(addresses),
  );
};

const nextGuestAddressId = (addresses: UserAddress[]) => {
  const maxId = addresses.reduce((max, address) => {
    return Number.isFinite(address.id) ? Math.max(max, address.id) : max;
  }, 0);

  return maxId + 1;
};

export const guestAddressStorage = {
  getAll(): UserAddress[] {
    return readGuestAddresses();
  },

  findById(id: number): UserAddress | undefined {
    return readGuestAddresses().find((address) => address.id === id);
  },

  add(address: Omit<UserAddress, 'id'>): UserAddress {
    const current = readGuestAddresses();
    const next: UserAddress = {
      ...address,
      id: nextGuestAddressId(current),
    };

    writeGuestAddresses([...current, next]);
    return next;
  },

  update(id: number, partial: Partial<UserAddress>): UserAddress | null {
    const current = readGuestAddresses();
    const index = current.findIndex((address) => address.id === id);

    if (index === -1) return null;

    const updated: UserAddress = {
      ...current[index],
      ...partial,
      id,
    };

    const next = [...current];
    next[index] = updated;
    writeGuestAddresses(next);

    return updated;
  },

  remove(id: number): boolean {
    const current = readGuestAddresses();
    const next = current.filter((address) => address.id !== id);

    if (next.length === current.length) return false;

    writeGuestAddresses(next);
    return true;
  },
};

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
