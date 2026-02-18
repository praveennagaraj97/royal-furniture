import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { FC } from 'react';
import { FiBriefcase, FiEdit2, FiHome, FiTrash2 } from 'react-icons/fi';

export interface Address {
  id: string;
  type: 'home' | 'work';
  name: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  phone: string;
  selected?: boolean;
}

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const typeIcon = {
  home: <FiHome className="h-5 w-5 text-deep-maroon" />,
  work: <FiBriefcase className="h-5 w-5 text-deep-maroon" />,
};

export const AddressList: FC<AddressListProps> = ({
  addresses,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-[#fff3f3] rounded-t-lg px-4 py-2 text-sm font-semibold text-gray-900">
        {addresses.length} Saved addressees
      </div>
      <StaggerContainer
        mode="animate"
        staggerChildren={0.08}
        delayChildren={0.05}
        className="space-y-4"
      >
        {addresses.map((address) => (
          <StaggerItem
            key={address.id}
            type="slideUp"
            distance={20}
            duration={0.35}
          >
            <div
              className={`relative rounded-xl border px-4 py-3 shadow-sm cursor-pointer transition-all ${
                address.selected
                  ? 'border-deep-maroon bg-[#fff3f3]'
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => onSelect(address.id)}
            >
              <div className="flex items-center gap-2 mb-1">
                {typeIcon[address.type]}
                <span className="font-semibold text-base text-black">
                  {address.type === 'home' ? 'Home' : 'Office'}
                </span>
                <button
                  type="button"
                  className="ml-2 text-xs text-deep-maroon hover:underline flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(address);
                  }}
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-gray-900 font-semibold">
                {address.name}
              </div>
              {address.company && (
                <div className="text-sm text-gray-700">{address.company}</div>
              )}
              <div className="text-sm text-gray-700">
                {address.addressLine1}
              </div>
              {address.addressLine2 && (
                <div className="text-sm text-gray-700">
                  {address.addressLine2}
                </div>
              )}
              <div className="text-sm text-gray-700">
                {address.city}, {address.country}
              </div>
              <div className="text-sm text-gray-700">
                Phone: {address.phone}
              </div>
              <button
                type="button"
                className="absolute top-3 right-3 text-deep-maroon hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address.id);
                }}
                aria-label="Delete address"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
              <span
                className={`absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 ${address.selected ? 'border-deep-maroon bg-deep-maroon' : 'border-gray-300 bg-white'}`}
              ></span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default AddressList;
