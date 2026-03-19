'use client';

import ShippingAddressSkeleton from '@/components/skeletons/shipping-address-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useCheckoutShipping } from '@/contexts/shipping-context';
import { useGetAddresses } from '@/hooks/api';
import type { AddressCategory, UserAddress } from '@/types/response/address';
import { guestAddressStorage } from '@/utils/guest-address-storage';
import { useTranslations } from 'next-intl';
import {
  FC,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Address, AddressList } from './address-list';
import CreateOrEditAddressForm from './create-or-edit-form';
import type { AddressFormData } from './create-or-edit-form/reducer';
import { EmptyAddressesState } from './states';

const addressCategoryToFormType = (
  category: AddressCategory,
): AddressFormData['addressType'] => {
  return category;
};

export const ShippingAddressSection: FC = () => {
  const t = useTranslations('shipping');
  const { isAuthenticated } = useAuth();
  const {
    shippingData,
    shippingSelection,
    setShippingSelection,
    revalidateShipping,
  } = useCheckoutShipping();
  const [guestAddresses, setGuestAddresses] = useState<Address[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const selectedAddressIdRef = useRef<string | null>(null);

  const {
    data: addressesResponse,
    isLoading,
    mutate,
  } = useGetAddresses({
    enabled: isAuthenticated,
  });

  const parsedAddresses = useMemo(() => {
    if (isAuthenticated) {
      if (!addressesResponse?.data) return [] as Address[];
      return addressesResponse.data.flatMap((group) => group.addresses || []);
    }

    return guestAddresses;
  }, [isAuthenticated, addressesResponse, guestAddresses]);

  useEffect(() => {
    if (!isAuthenticated) {
      startTransition(() => {
        setGuestAddresses(guestAddressStorage.getAll());
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    startTransition(() => {
      if (!parsedAddresses.length) {
        setAddresses([]);
        selectedAddressIdRef.current = null;
        if (shippingSelection.addressId !== null) {
          setShippingSelection({ addressId: null });
        }
        return;
      }
      const previouslySelected = selectedAddressIdRef.current;

      // If shipping API already has a selected address, prefer it.
      const selectedFromShipping =
        shippingSelection.addressId?.toString() ||
        (shippingData?.shipping_address?.id
          ? String(shippingData.shipping_address.id)
          : null);

      const selectedIdRaw =
        selectedFromShipping &&
        parsedAddresses.some((a) => String(a.id) === selectedFromShipping)
          ? selectedFromShipping
          : previouslySelected &&
              parsedAddresses.some((a) => String(a.id) === previouslySelected)
            ? previouslySelected
            : String(parsedAddresses[0].id);

      const selectedId = String(selectedIdRaw);

      setAddresses(
        parsedAddresses.map((addr) => ({
          ...addr,
          selected: String(addr.id) === selectedId,
        })),
      );
      selectedAddressIdRef.current = selectedId;
      const nextAddressId = Number(selectedId);
      if (shippingSelection.addressId !== nextAddressId) {
        setShippingSelection({ addressId: nextAddressId });
      }
    });
  }, [
    parsedAddresses,
    shippingData?.shipping_address?.id,
    shippingSelection.addressId,
    setShippingSelection,
  ]);

  const handleSelectAddress = (address: Address) => {
    const selectedId = String(address.id);
    selectedAddressIdRef.current = selectedId;
    setAddresses((prev) =>
      prev.map((entry) => ({
        ...entry,
        selected: String(entry.id) === selectedId,
      })),
    );
    setShippingSelection({ addressId: address.id });
  };

  const handleAddressSaved = (address: UserAddress, wasCreated: boolean) => {
    selectedAddressIdRef.current = String(address.id);
    setAddresses((prev) =>
      (wasCreated
        ? [
            ...prev.filter((entry) => String(entry.id) !== String(address.id)),
            address,
          ]
        : prev.map((entry) =>
            String(entry.id) === String(address.id)
              ? { ...entry, ...address }
              : entry,
          )
      ).map((entry) => ({
        ...entry,
        selected: String(entry.id) === String(address.id),
      })),
    );
    if (!isAuthenticated) {
      setGuestAddresses(guestAddressStorage.getAll());
    }
    setShippingSelection({ addressId: address.id });
    void revalidateShipping();
  };

  const handleDeleteAddress = (address: Address) => {
    if (isAuthenticated) {
      return;
    }

    const wasSelected = String(address.id) === selectedAddressIdRef.current;
    guestAddressStorage.remove(Number(address.id));

    const nextGuestAddresses = guestAddressStorage.getAll();
    setGuestAddresses(nextGuestAddresses);

    if (!wasSelected) {
      return;
    }

    const nextSelected = nextGuestAddresses[0] ?? null;
    selectedAddressIdRef.current = nextSelected
      ? String(nextSelected.id)
      : null;
    setShippingSelection({ addressId: nextSelected?.id ?? null });
  };

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAddress(null);
  };

  const shouldShowSkeleton = isAuthenticated && isLoading && !addresses.length;
  const shouldShowEmptyState = !shouldShowSkeleton && !addresses.length;
  const canAddAddress = isAuthenticated || addresses.length === 0;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">
          {t('titles.shippingAddress')}
        </h2>
        {!isEditing && canAddAddress && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setEditAddress(null);
            }}
            className="text-xs sm:text-sm font-semibold text-indigo-slate hover:underline"
          >
            {t('actions.addNew')}
          </button>
        )}
      </div>

      {isEditing ? (
        <CreateOrEditAddressForm
          onCancel={handleCancel}
          onSaved={handleAddressSaved}
          isGuest={!isAuthenticated}
          initialData={
            editAddress
              ? {
                  name: editAddress.name,
                  phone: editAddress.phone,
                  email: editAddress.email || '',
                  streetAddress: editAddress.area ?? editAddress.street,
                  building: editAddress.building || '',
                  emirateId: String(editAddress.emirate_id ?? ''),
                  regionId: String(editAddress.region_id ?? ''),
                  notes: editAddress.notes || '',
                  addressType: addressCategoryToFormType(editAddress.category),
                }
              : undefined
          }
          editMode={!!editAddress}
          mutateAddresses={mutate}
          editingAddressId={editAddress?.id}
        />
      ) : (
        <>
          {shouldShowSkeleton ? (
            <ShippingAddressSkeleton />
          ) : shouldShowEmptyState ? (
            <EmptyAddressesState />
          ) : (
            <AddressList
              addresses={addresses}
              onEdit={(address) => {
                if (isAuthenticated) {
                  handleEdit(address);
                }
              }}
              onSelect={handleSelectAddress}
              isGuest={!isAuthenticated}
              showEditAction={isAuthenticated}
              onDeleteAddress={handleDeleteAddress}
              mutateAddresses={mutate}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ShippingAddressSection;
