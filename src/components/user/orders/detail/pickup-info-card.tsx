import { FC } from 'react';
import { FiMapPin } from 'react-icons/fi';

const PickupInfoCard: FC = () => {
  return (
    <section className="rounded-sm border border-gray-100 bg-gray-50 p-3 flex items-start gap-3 text-xs sm:text-sm text-gray-700">
      <div className="mt-0.5 text-deep-maroon">
        <FiMapPin className="h-4 w-4" />
      </div>
      <div>
        <p className="font-medium">Pickup from store</p>
        <p className="text-gray-500">
          Order will be ready at your selected store.
        </p>
      </div>
    </section>
  );
};

export default PickupInfoCard;
