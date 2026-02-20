'use client';

import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { useGetAddresses } from '@/hooks/api';
import { addressService } from '@/services/api/address-service';
import type { AddressCategory, UserAddress } from '@/types/address';
import type { ParsedAPIError } from '@/types/error';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Address, AddressList } from './address-list/address-list';
import CreateOrEditAddressForm from './create-or-edit-address';
import { AddressFormData } from './create-or-edit-address/reducer';

const AddressListSkeleton = () => (
  <div className="space-y-3">
    {[1, 2].map((item) => (
      <div
        key={item}
        className="animate-pulse rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
      >
        <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-56 bg-gray-200 rounded mb-1.5" />
        <div className="h-3 w-48 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);

const toFormCategory = (type: AddressFormData['addressType']) => {
  if (type === 'work') return 'office';
  return type;
};

const addressCategoryToFormType = (
  category: AddressCategory,
): AddressFormData['addressType'] => {
  if (category === 'office') return 'work';
  if (category === 'other') return 'other';
  return 'home';
};

export const ShippingAddressSection: FC = () => {
  const { isAuthenticated } = useAuth();
  const { showError, showSuccess } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const selectedAddressIdRef = useRef<string | null>(null);

  const {
    data: addressesResponse,
    isLoading,
    mutate,
  } = useGetAddresses({
    enabled: isAuthenticated,
  });

  const getErrorMessage = useCallback((error: unknown, fallback: string) => {
    const parsed = error as ParsedAPIError;
    return parsed?.generalError || fallback;
  }, []);

  const parsedAddresses = useMemo(() => {
    if (!addressesResponse?.data) return [] as Address[];

    return addressesResponse.data.flatMap((group) => group.addresses || []);
  }, [addressesResponse]);

  useEffect(() => {
    if (!parsedAddresses.length) {
      setAddresses([]);
      selectedAddressIdRef.current = null;
      return;
    }

    const previouslySelected = selectedAddressIdRef.current;
    const defaultSelected = parsedAddresses.find((addr) => addr.is_default)?.id;
    const selectedIdRaw =
      previouslySelected &&
      parsedAddresses.some((a) => String(a.id) === previouslySelected)
        ? previouslySelected
        : String(defaultSelected ?? parsedAddresses[0].id);
    const selectedId = String(selectedIdRaw);

    setAddresses(
      parsedAddresses.map((addr) => ({
        ...addr,
        selected: String(addr.id) === selectedId,
      })),
    );
    selectedAddressIdRef.current = selectedId;
  }, [parsedAddresses]);

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsEditing(true);
  };

  const handleDelete = (id: string | number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await addressService.deleteAddress(Number(deleteId));
      await mutate();
      showSuccess('Address deleted');
    } catch (error) {
      showError(getErrorMessage(error, 'Failed to delete address'));
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => setDeleteId(null);

  const handleSelect = async (id: string | number) => {
    const nextId = String(id);
    selectedAddressIdRef.current = nextId;
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, selected: String(a.id) === nextId })),
    );
    try {
      await addressService.updateAddress(id, { is_default: true });
      await mutate();
    } catch (error) {
      showError(getErrorMessage(error, 'Failed to select address'));
    }
  };

  const handleSave = async (data: AddressFormData) => {
    const isDefault =
      editAddress?.selected || (!editAddress && !addresses.length);

    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      street: data.streetAddress,
      building: data.building,
      town_or_city: data.city,
      notes: data.notes,
      category: toFormCategory(data.addressType),
      is_default: isDefault,
    } satisfies Partial<UserAddress>;

    try {
      if (editAddress) {
        await addressService.updateAddress(editAddress.id, payload);
        showSuccess('Address updated');
      } else {
        await addressService.createAddress(payload);
        showSuccess('Address added');
      }

      await mutate();
      setIsEditing(false);
      setEditAddress(null);
    } catch (error) {
      showError(getErrorMessage(error, 'Failed to save address'));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAddress(null);
  };

  if (!isAuthenticated) {
    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            Shipping address
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Please sign in to add or manage your shipping addresses.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          Shipping address
        </h2>
        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setEditAddress(null);
            }}
            className="text-xs sm:text-sm font-semibold text-indigo-slate hover:underline"
          >
            Add New
          </button>
        )}
      </div>

      {isEditing ? (
        <CreateOrEditAddressForm
          onCancel={handleCancel}
          onAddressSaved={handleSave}
          initialData={
            editAddress
              ? {
                  name: editAddress.name,
                  phone: editAddress.phone,
                  email: editAddress.email || '',
                  streetAddress: editAddress.street,
                  building: editAddress.building || '',
                  city: editAddress.town_or_city,
                  notes: editAddress.notes || '',
                  addressType: addressCategoryToFormType(editAddress.category),
                }
              : undefined
          }
          editMode={!!editAddress}
        />
      ) : (
        <>
          {isLoading && !addresses.length ? (
            <AddressListSkeleton />
          ) : (
            <AddressList
              addresses={addresses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          )}
        </>
      )}

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        variant="danger"
      />
    </section>
  );
};

export default ShippingAddressSection;
