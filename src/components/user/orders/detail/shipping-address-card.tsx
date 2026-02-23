import type { OrderDetailShippingAddress } from '@/types/response';
import { FC } from 'react';

interface ShippingAddressCardProps {
  address: OrderDetailShippingAddress;
}

const ShippingAddressCard: FC<ShippingAddressCardProps> = ({ address }) => {
  const lines = [
    address.street,
    address.building,
    address.town_or_city,
    address.category,
  ].filter(Boolean);

  return (
    <section className="rounded-sm border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        Shipping address
      </h2>
      <div className="space-y-1 text-xs sm:text-sm text-gray-700">
        <p className="font-semibold">{address.name}</p>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>Phone: {address.phone}</p>
      </div>
    </section>
  );
};

export default ShippingAddressCard;
