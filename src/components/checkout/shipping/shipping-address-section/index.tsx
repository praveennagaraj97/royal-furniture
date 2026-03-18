'use client';

import ShippingAddressSkeleton from '@/components/skeletons/shipping-address-skeleton';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { useGetAddresses } from '@/hooks/api';
import type { AddressCategory, UserAddress } from '@/types/response/address';
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

type Props = {
  shippingAddress?: UserAddress | null;
  onShippingRevalidate?: () => Promise<void> | void;
};

export const ShippingAddressSection: FC<Props> = ({
  shippingAddress,
  onShippingRevalidate,
}) => {
  const t = useTranslations('shipping');
  const { isAuthenticated } = useAuth();
  const { shipping, setShippingSelection } = useCart();
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
    if (!addressesResponse?.data) return [] as Address[];
    return addressesResponse.data.flatMap((group) => group.addresses || []);
  }, [addressesResponse]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    startTransition(() => {
      if (!parsedAddresses.length) {
        setAddresses([]);
        selectedAddressIdRef.current = null;
        if (shipping.selection.addressId !== null) {
          setShippingSelection({ addressId: null });
        }
        return;
      }
      const previouslySelected = selectedAddressIdRef.current;

      // If parent provided a selected shipping address from the shipping step, prefer that
      const selectedFromShipping =
        shipping.selection.addressId?.toString() ||
        (shippingAddress?.id ? String(shippingAddress.id) : null);

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
      if (shipping.selection.addressId !== nextAddressId) {
        setShippingSelection({ addressId: nextAddressId });
      }
    });
  }, [
    parsedAddresses,
    isAuthenticated,
    shippingAddress?.id,
    shipping.selection.addressId,
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
    if (!isAuthenticated) {
      setShippingSelection({ addressId: address.id });
      void onShippingRevalidate?.();
      return;
    }

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
    setShippingSelection({ addressId: address.id });
    void onShippingRevalidate?.();
  };

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAddress(null);
  };

  const guestInitialAddress = shippingAddress ?? null;
  const guestInitialData: AddressFormData | undefined = guestInitialAddress
    ? {
        name: guestInitialAddress.name,
        phone: guestInitialAddress.phone,
        email: guestInitialAddress.email || '',
        streetAddress: guestInitialAddress.area ?? guestInitialAddress.street,
        building: guestInitialAddress.building || '',
        emirateId: String(guestInitialAddress.emirate_id ?? ''),
        regionId: String(guestInitialAddress.region_id ?? ''),
        notes: guestInitialAddress.notes || '',
        addressType: addressCategoryToFormType(guestInitialAddress.category),
      }
    : undefined;

  const shouldShowSkeleton = isAuthenticated && isLoading && !addresses.length;
  const shouldShowEmptyState = !shouldShowSkeleton && !addresses.length;

  return (
    <section className="space-y-3">
      {isAuthenticated && (
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            {t('titles.shippingAddress')}
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
              {t('actions.addNew')}
            </button>
          )}
        </div>
      )}

      {!isAuthenticated ? (
        <CreateOrEditAddressForm
          onSaved={handleAddressSaved}
          isGuest
          hideCancel
          initialData={guestInitialData}
          editMode={Boolean(guestInitialAddress?.id)}
          editingAddressId={guestInitialAddress?.id}
        />
      ) : isEditing ? (
        <CreateOrEditAddressForm
          onCancel={handleCancel}
          onSaved={handleAddressSaved}
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
              onEdit={handleEdit}
              onSelect={handleSelectAddress}
              mutateAddresses={mutate}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ShippingAddressSection;
