import { FC } from 'react';

const ShippingAddressCard: FC = () => {
  return (
    <section className="rounded-sm border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        Shipping address
      </h2>
      <div className="space-y-1 text-xs sm:text-sm text-gray-700">
        <p className="font-semibold">Jhon Doe</p>
        <p>Flat 205, Karama Centre Building</p>
        <p>Al Karama, Dubai, UAE</p>
        <p>Phone: +971 50 987 6543</p>
      </div>
    </section>
  );
};

export default ShippingAddressCard;
