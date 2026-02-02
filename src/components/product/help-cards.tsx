import { FC } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { PiStorefrontFill } from 'react-icons/pi';

interface HelpCardProps {
  className?: string;
  productName: string;
}

export const ProductNoteCard: FC<HelpCardProps> = ({
  className,
  productName,
}) => {
  return (
    <div className={className}>
      {/* Note Card */}
      <div className="mb-4 rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-600">
        <span className="font-medium mr-1">Note:</span>
        The product {productName} images have props used for illustrative
        purposes. Product Color may vary slightly due to photographic lighting
        or your screen settings.
      </div>
      {/* Help Card */}
    </div>
  );
};

export const ProductHelpCard: FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-4">
      <div className="text-lg font-medium  mb-2">
        Need help? We’re here for you.
      </div>
      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <FaPhoneAlt className="text-deep-maroon w-5 h-5" />
          <a href="#" className="text-gray-600 hover:underline">
            Request a call back
          </a>
        </li>

        <li className="flex items-center gap-3">
          <BsChatDots className="text-deep-maroon w-5 h-5" />
          <a href="#" className="text-gray-600 hover:underline">
            Chat with us
          </a>
        </li>
        <li className="flex items-center gap-3">
          <PiStorefrontFill className="text-deep-maroon w-5 h-5" />
          <a href="#" className="text-gray-600 hover:underline">
            Visit our store
          </a>
        </li>
      </ul>
    </div>
  );
};
