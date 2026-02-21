'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useToast } from '@/contexts/toast-context';
import { addressService } from '@/services/api/address-service';
import { ParsedAPIError } from '@/types';
import type { AddressesListResponse, UserAddress } from '@/types/address';
import { FC, useState } from 'react';
import {
  FiBriefcase,
  FiEdit2,
  FiHome,
  FiMoreHorizontal,
  FiTrash2,
} from 'react-icons/fi';
import { KeyedMutator } from 'swr';

export type Address = UserAddress & { selected?: boolean };

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete?: (id: string | number) => void;
  onSelect: (id: string | number) => void;
  // function to revalidate addresses after deletion
  mutateAddresses: KeyedMutator<AddressesListResponse>;
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
  mutateAddresses,
}) => {
  const { showError, showSuccess } = useToast();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteRequest = (id: string | number) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await addressService.deleteAddress(Number(deletingId));
      await mutateAddresses();
      showSuccess('Address deleted');
    } catch (err) {
      const parsedError = err as ParsedAPIError;

      showError(parsedError?.generalError || 'Failed to delete address');
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#fff3f3] rounded-t-lg px-4 py-2 text-sm font-semibold text-gray-900">
        {addresses.length} Saved addresses
      </div>
      <StaggerContainer
        mode="whileInView"
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
              onClick={() => {
                // Do nothing when already selected
                if (address.selected || address.is_default) return;
                onSelect(address.id);
              }}
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
                className="absolute top-3 right-3 text-deep-maroon hover:text-red-600 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  // open local confirm modal
                  handleDeleteRequest(address.id);
                }}
                aria-label="Delete address"
              >
                {isDeleting && String(deletingId) === String(address.id) ? (
                  <svg
                    className="animate-spin h-5 w-5 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <FiTrash2 className="h-5 w-5" />
                )}
              </button>
              <span
                className={`absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 ${address.selected || address.is_default ? 'border-deep-maroon bg-deep-maroon' : 'border-gray-300 bg-white'}`}
              ></span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AddressList;
