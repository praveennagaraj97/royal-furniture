import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import type { UserAddress } from '@/types/address';
import { FC } from 'react';
import {
  FiBriefcase,
  FiEdit2,
  FiHome,
  FiMoreHorizontal,
  FiTrash2,
} from 'react-icons/fi';

export type Address = UserAddress & { selected?: boolean };

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string | number) => void;
  onSelect: (id: string | number) => void;
}

const typeIcon = {
  home: <FiHome className="h-5 w-5 text-deep-maroon" />,
  office: <FiBriefcase className="h-5 w-5 text-deep-maroon" />,
  other: <FiMoreHorizontal className="h-5 w-5 text-deep-maroon" />,
};

const typeLabel: Record<Address['category'], string> = {
  home: 'Home',
  office: 'Office',
  other: 'Other',
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
        {addresses.length} Saved addresses
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
                {typeIcon[address.category]}
                <span className="font-semibold text-base text-black">
                  {typeLabel[address.category]}
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
              <div className="text-sm text-gray-700">{address.street}</div>
              {address.building ? (
                <div className="text-sm text-gray-700">{address.building}</div>
              ) : null}
              <div className="text-sm text-gray-700">
                {address.town_or_city}
              </div>
              {address.phone ? (
                <div className="text-sm text-gray-700">
                  Phone: {address.phone}
                </div>
              ) : null}
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
                className={`absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 ${address.selected || address.is_default ? 'border-deep-maroon bg-deep-maroon' : 'border-gray-300 bg-white'}`}
              ></span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default AddressList;
