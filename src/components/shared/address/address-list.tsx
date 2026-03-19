'use client';

import { StaggerContainer, StaggerItem } from '@/components/shared/animations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useToast } from '@/contexts/toast-context';
import { addressService } from '@/services/api/address-service';
import { ParsedAPIError } from '@/types';
import type {
  AddressesListResponse,
  UserAddress,
} from '@/types/response/address';
import { useTranslations } from 'next-intl';
import NProgress from 'nprogress';
import { FC, useEffect, useState } from 'react';
import {
  FiBriefcase,
  FiEdit2,
  FiHome,
  FiMoreHorizontal,
  FiTrash2,
} from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { KeyedMutator } from 'swr';

export type Address = UserAddress & { selected?: boolean };

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onSelect: (address: Address) => void;
  isGuest?: boolean;
  showEditAction?: boolean;
  onDeleteAddress?: (address: Address) => Promise<void> | void;
  mutateAddresses?: KeyedMutator<AddressesListResponse>;
  hideSelection?: boolean;
}

const typeIcon = {
  home: <FiHome className="h-5 w-5 text-deep-maroon" />,
  office: <FiBriefcase className="h-5 w-5 text-deep-maroon" />,
  other: <FiMoreHorizontal className="h-5 w-5 text-deep-maroon" />,
};

export const AddressList: FC<AddressListProps> = ({
  addresses,
  onEdit,
  onSelect,
  isGuest = false,
  showEditAction = true,
  onDeleteAddress,
  mutateAddresses,
  hideSelection = false,
}) => {
  const t = useTranslations('shipping');
  const { showError, showSuccess } = useToast();
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectingId, setSelectingId] = useState<string | number | null>(null);
  const [optimisticSelectedId, setOptimisticSelectedId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (selectingId === null) {
      const selected = addresses.find((addr) => addr.selected);
      setOptimisticSelectedId(selected ? String(selected.id) : null);
    }
  }, [addresses, selectingId]);

  const typeLabel: Record<Address['category'], string> = {
    home: t('addressTypes.home'),
    office: t('addressTypes.office'),
    other: t('addressTypes.other'),
  };

  const handleDeleteRequest = (id: string | number) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const deletingAddress = addresses.find(
        (address) => String(address.id) === String(deletingId),
      );

      if (isGuest && deletingAddress && onDeleteAddress) {
        await onDeleteAddress(deletingAddress);
      } else {
        await addressService.deleteAddress(Number(deletingId));
        await mutateAddresses?.();
      }

      showSuccess(t('addressList.deleted'));
    } catch (err) {
      const parsedError = err as ParsedAPIError;
      showError(parsedError?.generalError || t('addressList.failedDelete'));
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

  const handleSelect = async (id: string | number) => {
    setSelectingId(id);
    setOptimisticSelectedId(String(id));
    NProgress.start();
    try {
      const selectedAddress = addresses.find(
        (address) => String(address.id) === String(id),
      );
      if (selectedAddress) {
        onSelect(selectedAddress);
      }
      showSuccess(t('addressList.selected'));
    } catch (error) {
      const message =
        (error as ParsedAPIError)?.generalError ||
        t('addressList.failedSelect');
      showError(message);
    } finally {
      setSelectingId(null);
      NProgress.done();
    }
  };

  const isAddressSelected = (address: Address) => {
    if (optimisticSelectedId) {
      return String(address.id) === optimisticSelectedId;
    }
    return Boolean(address.selected);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#fff3f3] rounded-t-lg px-4 py-2 text-sm font-semibold text-gray-900">
        {t('addressList.savedAddresses', { count: addresses.length })}
      </div>
      <StaggerContainer
        mode="animate"
        staggerChildren={0.08}
        delayChildren={0.05}
        className="space-y-4"
        key={addresses.length}
      >
        {addresses.map((address) => (
          <StaggerItem
            key={address.id}
            type="slideUp"
            distance={20}
            duration={0.35}
          >
            <div
              className={`relative rounded-xl border px-4 py-3 shadow-sm transition-all ${
                !hideSelection && isAddressSelected(address)
                  ? 'border-deep-maroon bg-[#fff3f3] cursor-pointer'
                  : 'border-gray-200 bg-white cursor-pointer'
              }`}
              onClick={() => {
                if (hideSelection || isAddressSelected(address) || selectingId)
                  return;
                handleSelect(address.id);
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {typeIcon[address.category]}
                  <span className="font-semibold text-base text-black">
                    {typeLabel[address.category]}
                  </span>
                  {address.is_default && (
                    <span className="inline-flex items-center rounded-full bg-deep-maroon/10 px-2.5 py-0.5 text-xs font-semibold text-deep-maroon">
                      {t('addressList.default')}
                    </span>
                  )}
                </div>
                {showEditAction && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-deep-maroon hover:text-red-600 flex items-center justify-center p-1 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(address);
                      }}
                      aria-label="Edit address"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="text-deep-maroon hover:text-red-600 flex items-center justify-center p-1 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRequest(address.id);
                      }}
                      aria-label="Delete address"
                    >
                      {isDeleting &&
                      String(deletingId) === String(address.id) ? (
                        <ImSpinner2 className="animate-spin h-4 w-4" />
                      ) : (
                        <FiTrash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-900 font-semibold">
                {address.name}
              </div>
              <div className="text-sm text-gray-700">
                {address.area ?? address.street}
              </div>
              {address.building ? (
                <div className="text-sm text-gray-700">{address.building}</div>
              ) : null}
              {address.phone ? (
                <div className="text-sm text-gray-700">
                  {t('addressList.phone')}: {address.phone}
                </div>
              ) : null}
              {!hideSelection && (
                <span
                  className={`absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 transition-colors ${
                    isAddressSelected(address)
                      ? 'border-deep-maroon bg-deep-maroon'
                      : 'border-gray-300 bg-white'
                  }`}
                ></span>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={t('addressList.deleteTitle')}
        message={t('addressList.deleteMessage')}
        confirmText={
          isDeleting
            ? t('addressList.deleteSubmitting')
            : t('addressList.deleteConfirm')
        }
        cancelText={t('addressList.deleteCancel')}
        variant="danger"
      />
    </div>
  );
};

export default AddressList;
