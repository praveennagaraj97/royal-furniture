import { FC } from 'react';

interface OrderDetailHeaderProps {
  orderId: string;
}

const OrderDetailHeader: FC<OrderDetailHeaderProps> = ({ orderId }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      {/* <AppLink
        href="/user/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-deep-maroon transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </AppLink> */}
      {/* <span className="text-gray-300">|</span> */}
      <span className="font-medium">ID #{orderId}</span>
    </div>
  );
};

export default OrderDetailHeader;
